import { Ingredient, Meal, CalendarMeal, ShoppingList, ShoppingListItem, MealIngredient, IngredientCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { format, addDays } from 'date-fns';

// Mock ingredient categories with icons and colors
export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  { name: 'produce', color: 'bg-green-100 text-green-800', icon: '🥕' },
  { name: 'meat', color: 'bg-red-100 text-red-800', icon: '🥩' },
  { name: 'dairy', color: 'bg-blue-100 text-blue-800', icon: '🥛' },
  { name: 'pantry', color: 'bg-yellow-100 text-yellow-800', icon: '🥫' },
  { name: 'bakery', color: 'bg-orange-100 text-orange-800', icon: '🍞' },
  { name: 'frozen', color: 'bg-cyan-100 text-cyan-800', icon: '🧊' },
  { name: 'snacks', color: 'bg-purple-100 text-purple-800', icon: '🍿' },
];

// Mock ingredients data with high-quality food images
export const mockIngredients: Ingredient[] = [
  {
    id: uuidv4(),
    name: 'Chicken Breast',
    category: 'meat',
    imageUrl: '🐔',
    defaultUnit: 'lbs',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Ground Beef',
    category: 'meat',
    imageUrl: '🥩',
    defaultUnit: 'lbs',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Salmon Fillet',
    category: 'meat',
    imageUrl: '🐟',
    defaultUnit: 'lbs',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Pasta',
    category: 'pantry',
    imageUrl: '🍝',
    defaultUnit: 'boxes',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Rice',
    category: 'pantry',
    imageUrl: '🍚',
    defaultUnit: 'cups',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Tomatoes',
    category: 'produce',
    imageUrl: '🍅',
    defaultUnit: 'items',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Onions',
    category: 'produce',
    imageUrl: '🧅',
    defaultUnit: 'items',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Bell Peppers',
    category: 'produce',
    imageUrl: '🫑',
    defaultUnit: 'items',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Broccoli',
    category: 'produce',
    imageUrl: '🥦',
    defaultUnit: 'heads',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Milk',
    category: 'dairy',
    imageUrl: '🥛',
    defaultUnit: 'gallons',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Eggs',
    category: 'dairy',
    imageUrl: '🥚',
    defaultUnit: 'dozens',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Cheese',
    category: 'dairy',
    imageUrl: '🧀',
    defaultUnit: 'blocks',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Bread',
    category: 'bakery',
    imageUrl: '🍞',
    defaultUnit: 'loaves',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Olive Oil',
    category: 'pantry',
    imageUrl: '🫒',
    defaultUnit: 'bottles',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Garlic',
    category: 'produce',
    imageUrl: '🧄',
    defaultUnit: 'bulbs',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Spinach',
    category: 'produce',
    imageUrl: '🥬',
    defaultUnit: 'bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Additional ingredients for variety
  {
    id: uuidv4(),
    name: 'Avocado',
    category: 'produce',
    imageUrl: '🥑',
    defaultUnit: 'items',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Mushrooms',
    category: 'produce',
    imageUrl: '🍄',
    defaultUnit: 'lbs',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Carrots',
    category: 'produce',
    imageUrl: '🥕',
    defaultUnit: 'lbs',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Potatoes',
    category: 'produce',
    imageUrl: '🥔',
    defaultUnit: 'lbs',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Bananas',
    category: 'produce',
    imageUrl: '🍌',
    defaultUnit: 'bunches',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Apples',
    category: 'produce',
    imageUrl: '🍎',
    defaultUnit: 'bags',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Create meal ingredients
const createMealIngredient = (ingredient: Ingredient, quantity: number, unit?: string, optional: boolean = false): MealIngredient => ({
  id: uuidv4(),
  ingredient,
  quantity,
  unit: unit || ingredient.defaultUnit,
  optional,
});

// Mock meals data with appealing images
export const mockMeals: Meal[] = [
  {
    id: uuidv4(),
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, and pancetta',
    imageUrl: '🍝',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    serves: 4,
    difficultyLevel: 'medium',
    tags: ['italian', 'quick', 'comfort-food'],
    instructions: 'Cook pasta, mix with eggs and cheese, add crispy pancetta',
    ingredients: [
      createMealIngredient(mockIngredients.find(i => i.name === 'Pasta')!, 1, 'boxes'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Eggs')!, 0.5, 'dozens'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Cheese')!, 0.5, 'blocks'),
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Grilled Chicken & Vegetables',
    description: 'Healthy grilled chicken with seasonal roasted vegetables',
    imageUrl: '🍗',
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    serves: 4,
    difficultyLevel: 'easy',
    tags: ['healthy', 'grilled', 'high-protein', 'gluten-free'],
    instructions: 'Season and grill chicken, roast vegetables with olive oil',
    ingredients: [
      createMealIngredient(mockIngredients.find(i => i.name === 'Chicken Breast')!, 2, 'lbs'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Bell Peppers')!, 3, 'items'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Broccoli')!, 2, 'heads'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Olive Oil')!, 0.25, 'bottles'),
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Beef Stir Fry',
    description: 'Quick and colorful stir fry with tender beef and crisp vegetables',
    imageUrl: '🥘',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    serves: 4,
    difficultyLevel: 'easy',
    tags: ['quick', 'asian', 'one-pan', 'weeknight'],
    instructions: 'Slice beef thin, stir fry with vegetables over high heat',
    ingredients: [
      createMealIngredient(mockIngredients.find(i => i.name === 'Ground Beef')!, 1.5, 'lbs'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Bell Peppers')!, 2, 'items'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Onions')!, 1, 'items'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Rice')!, 2, 'cups'),
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Salmon with Garlic Spinach',
    description: 'Pan-seared salmon with sautéed garlic spinach',
    imageUrl: '🐟',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    serves: 4,
    difficultyLevel: 'medium',
    tags: ['healthy', 'seafood', 'quick', 'low-carb'],
    instructions: 'Sear salmon skin-side down, sauté spinach with garlic',
    ingredients: [
      createMealIngredient(mockIngredients.find(i => i.name === 'Salmon Fillet')!, 2, 'lbs'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Spinach')!, 2, 'bags'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Garlic')!, 1, 'bulbs'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Olive Oil')!, 0.25, 'bottles'),
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Veggie Omelet',
    description: 'Fluffy eggs with fresh vegetables and cheese',
    imageUrl: '🍳',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    serves: 2,
    difficultyLevel: 'easy',
    tags: ['breakfast', 'vegetarian', 'quick', 'protein'],
    instructions: 'Beat eggs, sauté vegetables, fold in cheese',
    ingredients: [
      createMealIngredient(mockIngredients.find(i => i.name === 'Eggs')!, 0.5, 'dozens'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Bell Peppers')!, 1, 'items'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Mushrooms')!, 0.25, 'lbs'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Cheese')!, 0.25, 'blocks'),
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Garden Fresh Salad',
    description: 'Crisp mixed vegetables with a light vinaigrette',
    imageUrl: '🥗',
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    serves: 4,
    difficultyLevel: 'easy',
    tags: ['healthy', 'vegetarian', 'fresh', 'no-cook'],
    instructions: 'Chop vegetables, toss with dressing',
    ingredients: [
      createMealIngredient(mockIngredients.find(i => i.name === 'Spinach')!, 1, 'bags'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Tomatoes')!, 2, 'items'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Avocado')!, 2, 'items'),
      createMealIngredient(mockIngredients.find(i => i.name === 'Olive Oil')!, 0.1, 'bottles'),
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock calendar meals for the next week
export const mockCalendarMeals: CalendarMeal[] = [
  {
    id: uuidv4(),
    meal: mockMeals[0],
    scheduledDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    mealType: 'dinner',
    servingSize: 4,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    meal: mockMeals[1],
    scheduledDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    mealType: 'dinner',
    servingSize: 4,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    meal: mockMeals[2],
    scheduledDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    mealType: 'dinner',
    servingSize: 4,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock shopping list
export const mockShoppingList: ShoppingList = {
  id: uuidv4(),
  name: 'This Week\'s Shopping',
  tripDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
  storeName: 'Whole Foods',
  createdAt: new Date().toISOString(),
};

// Generate shopping list items from calendar meals
export const generateShoppingListItems = (calendarMeals: CalendarMeal[]): ShoppingListItem[] => {
  const items: ShoppingListItem[] = [];
  const ingredientMap = new Map<string, { quantity: number; unit: string; ingredient: Ingredient }>();

  // Aggregate ingredients from all planned meals
  calendarMeals.forEach(calendarMeal => {
    calendarMeal.meal.ingredients.forEach(mealIngredient => {
      const key = mealIngredient.ingredient.id;
      const scaledQuantity = mealIngredient.quantity * (calendarMeal.servingSize / calendarMeal.meal.serves);
      
      if (ingredientMap.has(key)) {
        const existing = ingredientMap.get(key)!;
        existing.quantity += scaledQuantity;
      } else {
        ingredientMap.set(key, {
          quantity: scaledQuantity,
          unit: mealIngredient.unit,
          ingredient: mealIngredient.ingredient,
        });
      }
    });
  });

  // Convert to shopping list items
  ingredientMap.forEach(({ quantity, unit, ingredient }) => {
    items.push({
      id: uuidv4(),
      listId: mockShoppingList.id,
      ingredient,
      quantity,
      unit,
      priority: 'normal',
      category: ingredient.category,
      checked: false,
      addedManually: false,
      createdAt: new Date().toISOString(),
    });
  });

  // Add some manually added items
  const manualItems = [
    {
      ingredient: mockIngredients.find(i => i.name === 'Milk')!,
      quantity: 1,
      priority: 'urgent' as const,
    },
    {
      ingredient: mockIngredients.find(i => i.name === 'Bread')!,
      quantity: 2,
      priority: 'normal' as const,
    },
  ];

  manualItems.forEach(item => {
    items.push({
      id: uuidv4(),
      listId: mockShoppingList.id,
      ingredient: item.ingredient,
      quantity: item.quantity,
      unit: item.ingredient.defaultUnit,
      priority: item.priority,
      category: item.ingredient.category,
      checked: false,
      addedManually: true,
      createdAt: new Date().toISOString(),
    });
  });

  return items;
};

export const mockShoppingListItems = generateShoppingListItems(mockCalendarMeals);

// Helper function to get category info
export const getCategoryInfo = (categoryName: string) => {
  return INGREDIENT_CATEGORIES.find(cat => cat.name === categoryName) || {
    name: categoryName,
    color: 'bg-gray-100 text-gray-800',
    icon: '📦',
  };
};
