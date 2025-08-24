-- Family Meal Planning & Grocery Management Database Schema

-- Enable UUID extension (PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core ingredient/item management
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100), -- produce, dairy, meat, pantry, frozen, bakery, etc.
    image_url VARCHAR(500),
    default_unit VARCHAR(50), -- cups, lbs, items, oz, etc.
    barcode VARCHAR(50), -- for scanning support
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_ingredients_category ON ingredients(category);
CREATE INDEX idx_ingredients_name ON ingredients(name);

-- Meal templates that can be reused
CREATE TABLE meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    serves INTEGER DEFAULT 4,
    difficulty_level VARCHAR(20) DEFAULT 'medium', -- easy, medium, hard
    tags TEXT[], -- quick, vegetarian, kid-friendly, one-pot, etc.
    instructions TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for meal searching
CREATE INDEX idx_meals_tags ON meals USING GIN(tags);
CREATE INDEX idx_meals_prep_time ON meals(prep_time_minutes);

-- Ingredients needed for each meal
CREATE TABLE meal_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_id UUID REFERENCES meals(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity DECIMAL(10,2),
    unit VARCHAR(50),
    optional BOOLEAN DEFAULT false,
    preparation VARCHAR(100), -- diced, sliced, minced, etc.
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for meal ingredient lookups
CREATE INDEX idx_meal_ingredients_meal_id ON meal_ingredients(meal_id);
CREATE INDEX idx_meal_ingredients_ingredient_id ON meal_ingredients(ingredient_id);

-- Calendar of planned meals
CREATE TABLE meal_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_id UUID REFERENCES meals(id) ON DELETE CASCADE,
    scheduled_date DATE NOT NULL,
    meal_type VARCHAR(50) DEFAULT 'dinner', -- breakfast, lunch, dinner, snack
    serving_size INTEGER DEFAULT 4,
    notes TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for calendar queries
CREATE INDEX idx_meal_calendar_date ON meal_calendar(scheduled_date);
CREATE INDEX idx_meal_calendar_meal_type ON meal_calendar(meal_type);

-- Shopping list management
CREATE TABLE shopping_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) DEFAULT 'Shopping List',
    trip_date DATE,
    store_name VARCHAR(255),
    estimated_total DECIMAL(10,2),
    actual_total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

CREATE TABLE shopping_list_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity DECIMAL(10,2),
    unit VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'normal', -- urgent, normal, stock-up
    category VARCHAR(100),
    aisle_number INTEGER, -- for store layout optimization
    estimated_price DECIMAL(8,2),
    actual_price DECIMAL(8,2),
    checked BOOLEAN DEFAULT false,
    added_manually BOOLEAN DEFAULT false, -- vs auto-generated from meals
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    checked_at TIMESTAMP
);

-- Add indexes for shopping list queries
CREATE INDEX idx_shopping_list_items_list_id ON shopping_list_items(list_id);
CREATE INDEX idx_shopping_list_items_category ON shopping_list_items(category);
CREATE INDEX idx_shopping_list_items_priority ON shopping_list_items(priority);

-- Pantry inventory (optional feature for tracking what's at home)
CREATE TABLE pantry_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity DECIMAL(10,2),
    unit VARCHAR(50),
    expiry_date DATE,
    purchase_date DATE,
    location VARCHAR(100), -- fridge, pantry, freezer, cabinet
    opened BOOLEAN DEFAULT false,
    opened_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for pantry management
CREATE INDEX idx_pantry_items_ingredient_id ON pantry_items(ingredient_id);
CREATE INDEX idx_pantry_items_expiry ON pantry_items(expiry_date);
CREATE INDEX idx_pantry_items_location ON pantry_items(location);

-- Store layout configuration (optional - for optimizing shopping trips)
CREATE TABLE store_layouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    aisle_number INTEGER,
    section_order INTEGER, -- order within the aisle
    created_at TIMESTAMP DEFAULT NOW()
);

-- Family preferences and dietary restrictions
CREATE TABLE family_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_name VARCHAR(255),
    dietary_restrictions TEXT[], -- vegetarian, gluten-free, dairy-free, etc.
    allergies TEXT[],
    favorite_cuisines TEXT[], -- italian, mexican, asian, etc.
    disliked_ingredients UUID[] -- array of ingredient IDs
);

-- Meal history and ratings
CREATE TABLE meal_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_id UUID REFERENCES meals(id) ON DELETE CASCADE,
    cooked_date DATE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    would_make_again BOOLEAN,
    actual_prep_time INTEGER, -- minutes
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add some sample data
INSERT INTO ingredients (name, category, default_unit) VALUES 
('Chicken Breast', 'meat', 'lbs'),
('Ground Beef', 'meat', 'lbs'),
('Salmon Fillet', 'meat', 'lbs'),
('Pasta', 'pantry', 'boxes'),
('Rice', 'pantry', 'cups'),
('Tomatoes', 'produce', 'items'),
('Onions', 'produce', 'items'),
('Bell Peppers', 'produce', 'items'),
('Broccoli', 'produce', 'heads'),
('Milk', 'dairy', 'gallons'),
('Eggs', 'dairy', 'dozens'),
('Cheese', 'dairy', 'blocks'),
('Bread', 'bakery', 'loaves'),
('Olive Oil', 'pantry', 'bottles'),
('Salt', 'pantry', 'containers');

-- Sample meals
INSERT INTO meals (name, description, prep_time_minutes, cook_time_minutes, serves, tags) VALUES 
('Spaghetti Marinara', 'Classic pasta with tomato sauce', 15, 25, 4, ARRAY['quick', 'vegetarian', 'kid-friendly']),
('Grilled Chicken & Vegetables', 'Healthy grilled chicken with seasonal vegetables', 20, 30, 4, ARRAY['healthy', 'gluten-free', 'high-protein']),
('Beef Stir Fry', 'Quick and easy stir fry with vegetables', 15, 15, 4, ARRAY['quick', 'one-pan', 'asian']);

-- Create views for common queries
CREATE VIEW upcoming_meals AS
SELECT 
    mc.id,
    mc.scheduled_date,
    mc.meal_type,
    mc.serving_size,
    m.name as meal_name,
    m.image_url,
    m.prep_time_minutes
FROM meal_calendar mc
JOIN meals m ON mc.meal_id = m.id
WHERE mc.scheduled_date >= CURRENT_DATE
ORDER BY mc.scheduled_date, mc.meal_type;

CREATE VIEW shopping_list_summary AS
SELECT 
    sl.id,
    sl.name,
    sl.created_at,
    COUNT(sli.id) as total_items,
    COUNT(CASE WHEN sli.checked THEN 1 END) as checked_items,
    SUM(sli.estimated_price) as estimated_total
FROM shopping_lists sl
LEFT JOIN shopping_list_items sli ON sl.id = sli.list_id
WHERE sl.completed_at IS NULL
GROUP BY sl.id, sl.name, sl.created_at;
