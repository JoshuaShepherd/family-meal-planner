export interface Ingredient {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  defaultUnit: string;
  barcode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MealIngredient {
  id: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  optional: boolean;
  preparation?: string;
}

export interface Meal {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  serves: number;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  tags: string[];
  instructions?: string;
  ingredients: MealIngredient[];
  createdAt: string;
  updatedAt: string;
}

export interface CalendarMeal {
  id: string;
  meal: Meal;
  scheduledDate: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  servingSize: number;
  notes?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  tripDate?: string;
  storeName?: string;
  estimatedTotal?: number;
  actualTotal?: number;
  createdAt: string;
  completedAt?: string;
}

export interface ShoppingListItem {
  id: string;
  listId: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  priority: 'urgent' | 'normal' | 'stock-up';
  category: string;
  aisleNumber?: number;
  estimatedPrice?: number;
  actualPrice?: number;
  checked: boolean;
  addedManually: boolean;
  notes?: string;
  createdAt: string;
  checkedAt?: string;
}

export interface PantryItem {
  id: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  expiryDate?: string;
  purchaseDate?: string;
  location: string;
  opened: boolean;
  openedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyPreference {
  id: string;
  memberName?: string;
  dietaryRestrictions: string[];
  allergies: string[];
  favoriteCuisines: string[];
  dislikedIngredients: string[];
}

export interface MealHistory {
  id: string;
  meal: Meal;
  cookedDate: string;
  rating?: number;
  notes?: string;
  wouldMakeAgain?: boolean;
  actualPrepTime?: number;
  createdAt: string;
}

export interface StoreLayout {
  id: string;
  storeName: string;
  category: string;
  aisleNumber: number;
  sectionOrder: number;
  createdAt: string;
}

export interface IngredientCategory {
  name: string;
  color: string;
  icon: string;
}
