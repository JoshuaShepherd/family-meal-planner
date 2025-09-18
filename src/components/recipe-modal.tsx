'use client';

import { Meal } from '@/types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose 
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat, Utensils } from 'lucide-react';
import { getCategoryInfo } from '@/data/mockData';

interface RecipeModalProps {
  meal: Meal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecipeModal({ meal, open, onOpenChange }: RecipeModalProps) {
  if (!meal) return null;

  const totalTime = (meal.prepTimeMinutes || 0) + (meal.cookTimeMinutes || 0);
  
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogClose />
        
        <div className="p-6">
          {/* Header */}
          <DialogHeader className="mb-6">
            <div className="flex items-start gap-4">
              {meal.imageUrl && (
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">{meal.imageUrl}</span>
                </div>
              )}
              <div className="flex-1">
                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {meal.name}
                </DialogTitle>
                {meal.description && (
                  <p className="text-gray-600 mb-3">{meal.description}</p>
                )}
                
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {meal.prepTimeMinutes && (
                      <span>{meal.prepTimeMinutes}m prep</span>
                    )}
                    {meal.prepTimeMinutes && meal.cookTimeMinutes && (
                      <span className="mx-1">•</span>
                    )}
                    {meal.cookTimeMinutes && (
                      <span>{meal.cookTimeMinutes}m cook</span>
                    )}
                    {totalTime > 0 && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="font-medium">{totalTime}m total</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Serves {meal.serves}</span>
                  </div>
                  <Badge className={difficultyColors[meal.difficultyLevel]}>
                    {meal.difficultyLevel}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Utensils className="w-5 h-5" />
                Ingredients
              </h3>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {meal.ingredients.map((ingredient, index) => {
                      const categoryInfo = getCategoryInfo(ingredient.ingredient.category);
                      return (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50">
                              {ingredient.ingredient.imageUrl ? (
                                <span className="text-lg">{ingredient.ingredient.imageUrl}</span>
                              ) : (
                                <span className="text-lg">{categoryInfo.icon}</span>
                              )}
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">
                                {ingredient.ingredient.name}
                              </span>
                              {ingredient.preparation && (
                                <span className="text-sm text-gray-500 ml-2">
                                  ({ingredient.preparation})
                                </span>
                              )}
                              {ingredient.optional && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  Optional
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-700">
                            {ingredient.quantity} {ingredient.unit}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructions & Additional Info */}
            <div className="space-y-6">
              {/* Instructions */}
              {meal.instructions && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
                    <ChefHat className="w-5 h-5" />
                    Instructions
                  </h3>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="prose prose-sm max-w-none">
                        {meal.instructions.split('.').filter(step => step.trim()).map((step, index) => (
                          <div key={index} className="flex gap-3 mb-3 last:mb-0">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 m-0 pt-0.5">
                              {step.trim()}.
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Tags */}
              {meal.tags && meal.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {meal.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="capitalize">
                        {tag.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutritional/Time Summary */}
              <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Prep Time:</span>
                      <div className="font-medium">{meal.prepTimeMinutes || 0} minutes</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Cook Time:</span>
                      <div className="font-medium">{meal.cookTimeMinutes || 0} minutes</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Servings:</span>
                      <div className="font-medium">{meal.serves} people</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Difficulty:</span>
                      <div className="font-medium capitalize">{meal.difficultyLevel}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}