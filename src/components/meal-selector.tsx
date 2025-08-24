'use client';

import { useState, useMemo } from 'react';
import { mockIngredients, mockMeals, INGREDIENT_CATEGORIES, getCategoryInfo } from '@/data/mockData';
import { Ingredient } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat } from 'lucide-react';

export function MealSelector() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter ingredients by category
  const filteredIngredients = useMemo(() => {
    if (!selectedCategory) return mockIngredients;
    return mockIngredients.filter(ingredient => ingredient.category === selectedCategory);
  }, [selectedCategory]);

  // Find meals that can be made with selected ingredients
  const suggestedMeals = useMemo(() => {
    if (selectedIngredients.length === 0) return mockMeals;
    
    return mockMeals.filter(meal => {
      const mealIngredientIds = meal.ingredients.map(mi => mi.ingredient.id);
      const selectedIds = selectedIngredients.map(si => si.id);
      
      // Check if at least 50% of meal ingredients are selected
      const matchingIngredients = mealIngredientIds.filter(id => selectedIds.includes(id));
      return matchingIngredients.length >= Math.ceil(mealIngredientIds.length * 0.5);
    });
  }, [selectedIngredients]);

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

  return (
    <div className="space-y-8">
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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredIngredients.map(ingredient => {
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
          </div>
        </div>

        {/* Meal Suggestions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedIngredients.length > 0 ? 'Here\'s what you can make:' : 'Popular Meals'}
          </h2>

          <div className="space-y-4">
            {suggestedMeals.map(meal => (
              <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                        {meal.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1 text-xs">
                        {meal.ingredients.slice(0, 4).map(ingredient => {
                          const isSelected = selectedIngredients.find(si => si.id === ingredient.ingredient.id);
                          return (
                            <span
                              key={ingredient.ingredient.id}
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
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
