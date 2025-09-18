'use client';

import { useState, useMemo } from 'react';
import { mockIngredients, mockMeals, INGREDIENT_CATEGORIES, getCategoryInfo } from '@/data/mockData';
import { Ingredient, Meal } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat, Search, Utensils } from 'lucide-react';
import { RecipeModal } from '@/components/recipe-modal';
import { SearchAndSort, SortOption, FilterOption } from '@/components/search-and-sort';
import { AnimatedCardGrid, AnimatedList, EmptyState } from '@/components/animated-containers';

export function MealSelector() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  
  // Search and sort state
  const [ingredientSearchQuery, setIngredientSearchQuery] = useState('');
  const [ingredientSortBy, setIngredientSortBy] = useState('name');
  const [ingredientFilters, setIngredientFilters] = useState<string[]>([]);
  
  const [mealSearchQuery, setMealSearchQuery] = useState('');
  const [mealSortBy, setMealSortBy] = useState('name');
  const [mealFilters, setMealFilters] = useState<string[]>([]);

  // Search and sort options
  const ingredientSortOptions: SortOption[] = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'category', label: 'Category' },
  ];

  const ingredientFilterOptions: FilterOption[] = INGREDIENT_CATEGORIES.map(cat => ({
    value: cat.name,
    label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
    icon: cat.icon,
    color: cat.color,
  }));

  const mealSortOptions: SortOption[] = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'time', label: 'Cooking Time' },
    { value: 'time-desc', label: 'Cooking Time (Longest)' },
    { value: 'difficulty', label: 'Difficulty (Easy First)' },
    { value: 'difficulty-desc', label: 'Difficulty (Hard First)' },
    { value: 'serves', label: 'Serving Size' },
  ];

  const mealFilterOptions: FilterOption[] = [
    { value: 'easy', label: 'Easy', icon: '🟢' },
    { value: 'medium', label: 'Medium', icon: '🟡' },
    { value: 'hard', label: 'Hard', icon: '🔴' },
    { value: 'quick', label: 'Quick (<30min)', icon: '⚡' },
    { value: 'comfort-food', label: 'Comfort Food', icon: '🏠' },
    { value: 'healthy', label: 'Healthy', icon: '🥗' },
    { value: 'one-pot', label: 'One Pot', icon: '🍲' },
    { value: 'family-friendly', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
  ];

  // Filter ingredients by category and search
  const filteredIngredients = useMemo(() => {
    let filtered = mockIngredients;

    // Filter by selected category (legacy support)
    if (selectedCategory) {
      filtered = filtered.filter(ingredient => ingredient.category === selectedCategory);
    }

    // Filter by active filters
    if (ingredientFilters.length > 0) {
      filtered = filtered.filter(ingredient => ingredientFilters.includes(ingredient.category));
    }

    // Filter by search query
    if (ingredientSearchQuery) {
      filtered = filtered.filter(ingredient =>
        ingredient.name.toLowerCase().includes(ingredientSearchQuery.toLowerCase())
      );
    }

    // Sort ingredients
    return filtered.sort((a, b) => {
      switch (ingredientSortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'category':
          return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [selectedCategory, ingredientFilters, ingredientSearchQuery, ingredientSortBy]);

  // Filter and sort meals
  const filteredMeals = useMemo(() => {
    let filtered = mockMeals;

    // Filter by selected ingredients (existing logic)
    if (selectedIngredients.length > 0) {
      filtered = filtered.filter(meal => {
        const mealIngredientIds = meal.ingredients.map(mi => mi.ingredient.id);
        const selectedIds = selectedIngredients.map(si => si.id);
        const matchingIngredients = mealIngredientIds.filter(id => selectedIds.includes(id));
        return matchingIngredients.length >= Math.ceil(mealIngredientIds.length * 0.5);
      });
    }

    // Filter by search query
    if (mealSearchQuery) {
      filtered = filtered.filter(meal =>
        meal.name.toLowerCase().includes(mealSearchQuery.toLowerCase()) ||
        meal.description?.toLowerCase().includes(mealSearchQuery.toLowerCase()) ||
        meal.tags.some(tag => tag.toLowerCase().includes(mealSearchQuery.toLowerCase())) ||
        meal.ingredients.some(ing => ing.ingredient.name.toLowerCase().includes(mealSearchQuery.toLowerCase()))
      );
    }

    // Filter by meal filters
    if (mealFilters.length > 0) {
      filtered = filtered.filter(meal => {
        return mealFilters.some(filter => {
          switch (filter) {
            case 'easy':
            case 'medium':
            case 'hard':
              return meal.difficultyLevel === filter;
            case 'quick':
              return ((meal.prepTimeMinutes || 0) + (meal.cookTimeMinutes || 0)) < 30;
            default:
              return meal.tags.includes(filter);
          }
        });
      });
    }

    // Sort meals
    return filtered.sort((a, b) => {
      switch (mealSortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'time':
          return ((a.prepTimeMinutes || 0) + (a.cookTimeMinutes || 0)) - ((b.prepTimeMinutes || 0) + (b.cookTimeMinutes || 0));
        case 'time-desc':
          return ((b.prepTimeMinutes || 0) + (b.cookTimeMinutes || 0)) - ((a.prepTimeMinutes || 0) + (a.cookTimeMinutes || 0));
        case 'difficulty':
          const diffOrder = { easy: 1, medium: 2, hard: 3 };
          return diffOrder[a.difficultyLevel] - diffOrder[b.difficultyLevel];
        case 'difficulty-desc':
          const diffOrderDesc = { easy: 3, medium: 2, hard: 1 };
          return diffOrderDesc[a.difficultyLevel] - diffOrderDesc[b.difficultyLevel];
        case 'serves':
          return a.serves - b.serves;
        default:
          return 0;
      }
    });
  }, [selectedIngredients, mealSearchQuery, mealFilters, mealSortBy]);

  // Filter ingredients by category
  const filteredIngredientsByCategory = useMemo(() => {
    if (!selectedCategory) return mockIngredients;
    return mockIngredients.filter(ingredient => ingredient.category === selectedCategory);
  }, [selectedCategory]);

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => 
      prev.find(i => i.id === ingredient.id)
        ? prev.filter(i => i.id !== ingredient.id)
        : [...prev, ingredient]
    );
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
  };

  // Open recipe modal
  const openRecipeModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsRecipeModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Recipe Modal */}
      <RecipeModal 
        meal={selectedMeal}
        open={isRecipeModalOpen}
        onOpenChange={setIsRecipeModalOpen}
      />
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          What sounds good today?
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Select ingredients you have or want to cook with, and we&apos;ll suggest delicious meals for your family
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
          className="h-12"
        >
          All Categories
        </Button>
        {INGREDIENT_CATEGORIES.map(category => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.name)}
            className="h-12"
          >
            <span className="mr-2 text-lg">{category.icon}</span>
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </Button>
        ))}
      </div>

      {/* Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Selected Ingredients ({selectedIngredients.length})
            </h3>
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map(ingredient => {
              const categoryInfo = getCategoryInfo(ingredient.category);
              return (
                <Badge
                  key={ingredient.id}
                  variant="secondary"
                  className={`${categoryInfo.color} px-3 py-1 cursor-pointer`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {categoryInfo.icon} {ingredient.name} ✕
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ingredient Selection */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Ingredients</h2>
          
          <SearchAndSort
            searchQuery={ingredientSearchQuery}
            onSearchChange={setIngredientSearchQuery}
            sortBy={ingredientSortBy}
            onSortChange={setIngredientSortBy}
            sortOptions={ingredientSortOptions}
            filterOptions={ingredientFilterOptions}
            selectedFilters={ingredientFilters}
            onFilterChange={setIngredientFilters}
            placeholder="Search ingredients by name..."
            resultsCount={filteredIngredients.length}
          />

          {/* Legacy Category Filter for backwards compatibility */}
          {!ingredientSearchQuery && ingredientFilters.length === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {INGREDIENT_CATEGORIES.map(category => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  className={`h-12 ${category.color}`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </Button>
              ))}
            </div>
          )}

          {(filteredIngredients.length === 0 && selectedCategory) ? 
            filteredIngredientsByCategory.length === 0 ? (
              <EmptyState
                title="No ingredients found"
                description="Try adjusting your search or filters to find ingredients."
                icon={<Search className="w-12 h-12" />}
                action={
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIngredientSearchQuery('');
                      setIngredientFilters([]);
                      setSelectedCategory(null);
                    }}
                  >
                    Clear Search & Filters
                  </Button>
                }
              />
            ) : (
              <AnimatedCardGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredIngredientsByCategory.map((ingredient: Ingredient) => {
                  const isSelected = selectedIngredients.find(i => i.id === ingredient.id);
                  const categoryInfo = getCategoryInfo(ingredient.category);
                  
                  return (
                    <Card
                      key={ingredient.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                        isSelected ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                      }`}
                      onClick={() => toggleIngredient(ingredient)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square rounded-lg overflow-hidden mb-3">
                          {ingredient.imageUrl ? (
                            <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                              <span className="text-5xl">{ingredient.imageUrl}</span>
                            </div>
                          ) : (
                            <div className={`w-full h-full ${categoryInfo.color} flex items-center justify-center`}>
                              <span className="text-3xl">{categoryInfo.icon}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-center text-sm">{ingredient.name}</h3>
                        <div className="flex justify-center mt-2">
                          <Badge variant="outline" className={`text-xs ${categoryInfo.color}`}>
                            {ingredient.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </AnimatedCardGrid>
            )
          : filteredIngredients.length === 0 ? (
            <EmptyState
              title="No ingredients found"
              description="Try adjusting your search or filters to find ingredients."
              icon={<Search className="w-12 h-12" />}
              action={
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIngredientSearchQuery('');
                    setIngredientFilters([]);
                    setSelectedCategory(null);
                  }}
                >
                  Clear Search & Filters
                </Button>
              }
            />
          ) : (
            <AnimatedCardGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredIngredients.map((ingredient: Ingredient) => {
                const isSelected = selectedIngredients.find(i => i.id === ingredient.id);
                const categoryInfo = getCategoryInfo(ingredient.category);
                
                return (
                  <Card
                    key={ingredient.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                      isSelected ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                    }`}
                    onClick={() => toggleIngredient(ingredient)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square rounded-lg overflow-hidden mb-3">
                        {ingredient.imageUrl ? (
                          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                            <span className="text-5xl">{ingredient.imageUrl}</span>
                          </div>
                        ) : (
                          <div className={`w-full h-full ${categoryInfo.color} flex items-center justify-center`}>
                            <span className="text-3xl">{categoryInfo.icon}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-center text-sm">{ingredient.name}</h3>
                      <div className="flex justify-center mt-2">
                        <Badge variant="outline" className={`text-xs ${categoryInfo.color}`}>
                          {ingredient.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </AnimatedCardGrid>
          )}
        </div>

        {/* Meal Suggestions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedIngredients.length > 0 ? 'Here\'s what you can make:' : 'Popular Meals'}
          </h2>

          <div className="space-y-4">
            <SearchAndSort
              searchQuery={mealSearchQuery}
              onSearchChange={setMealSearchQuery}
              sortBy={mealSortBy}
              onSortChange={setMealSortBy}
              sortOptions={mealSortOptions}
              filterOptions={mealFilterOptions}
              selectedFilters={mealFilters}
              onFilterChange={setMealFilters}
              placeholder="Search meals by name, ingredients, or tags..."
              resultsCount={filteredMeals.length}
            />

            {filteredMeals.length === 0 ? (
              <EmptyState
                title="No meals found"
                description="Try adjusting your search or filters to find delicious meals to cook."
                icon={<Utensils className="w-12 h-12" />}
                action={
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setMealSearchQuery('');
                      setMealFilters([]);
                    }}
                  >
                    Clear Search & Filters
                  </Button>
                }
              />
            ) : (
              <AnimatedCardGrid className="space-y-4">
                {filteredMeals.map((meal: Meal) => (
                  <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openRecipeModal(meal)}>
                    <div className="flex">
                      <div className="w-32 h-32 flex-shrink-0">
                        {meal.imageUrl ? (
                          <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center border border-orange-100">
                            <span className="text-6xl">{meal.imageUrl}</span>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                            <ChefHat className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <CardHeader className="p-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg mb-1">{meal.name}</CardTitle>
                              <CardDescription className="text-sm">
                                {meal.description}
                              </CardDescription>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                meal.difficultyLevel === 'easy'
                                  ? 'border-green-200 text-green-700 bg-green-50'
                                  : meal.difficultyLevel === 'medium'
                                  ? 'border-yellow-200 text-yellow-700 bg-yellow-50'
                                  : 'border-red-200 text-red-700 bg-red-50'
                              }
                            >
                              {meal.difficultyLevel}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0 mt-3">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {(meal.prepTimeMinutes || 0) + (meal.cookTimeMinutes || 0)} min
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Serves {meal.serves}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {meal.tags.slice(0, 3).map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-1 text-xs mb-4">
                            {meal.ingredients.slice(0, 4).map((ingredient: any, index: number) => {
                              const isSelected = selectedIngredients.find(si => si.id === ingredient.ingredient.id);
                              return (
                                <span
                                  key={index}
                                  className={`px-2 py-1 rounded ${
                                    isSelected
                                      ? 'bg-emerald-100 text-emerald-700 font-medium'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {ingredient.ingredient.name}
                                </span>
                              );
                            })}
                            {meal.ingredients.length > 4 && (
                              <span className="px-2 py-1 rounded bg-gray-100 text-gray-500">
                                +{meal.ingredients.length - 4} more
                              </span>
                            )}
                          </div>

                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              openRecipeModal(meal);
                            }}
                          >
                            <ChefHat className="w-4 h-4 mr-2" />
                            View Recipe
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </AnimatedCardGrid>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
