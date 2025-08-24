'use client';

import { useState } from 'react';
import { mockCalendarMeals, mockMeals } from '@/data/mockData';
import { CalendarMeal } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format, addDays, startOfWeek } from 'date-fns';
import { Clock, Users, ChefHat } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';

export function MealPlanner() {
  const [calendarMeals, setCalendarMeals] = useState<CalendarMeal[]>(mockCalendarMeals);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date()));

  // Get days of the current week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentWeekStart, i);
    return {
      date: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEEE'),
      dayNumber: format(date, 'd'),
      isToday: format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
    };
  });

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

  // Get meals for a specific day and meal type
  const getMealsForSlot = (date: string, mealType: string) => {
    return calendarMeals.filter(
      cm => cm.scheduledDate === date && cm.mealType === mealType
    );
  };

  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // If dropping from meal library to calendar
    if (source.droppableId === 'meal-library' && destination.droppableId.startsWith('calendar-')) {
      const [, date, mealType] = destination.droppableId.split('-');
      const mealIndex = parseInt(source.index.toString());
      const selectedMeal = mockMeals[mealIndex];

      const newCalendarMeal: CalendarMeal = {
        id: uuidv4(),
        meal: selectedMeal,
        scheduledDate: date,
        mealType: mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
        servingSize: selectedMeal.serves,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setCalendarMeals(prev => [...prev, newCalendarMeal]);
    }

    // If moving within calendar or removing
    if (source.droppableId.startsWith('calendar-') && destination.droppableId.startsWith('calendar-')) {
      const [, sourceDate, sourceMealType] = source.droppableId.split('-');
      const [, destDate, destMealType] = destination.droppableId.split('-');

      const sourceMeals = getMealsForSlot(sourceDate, sourceMealType);
      const mealToMove = sourceMeals[source.index];

      if (mealToMove) {
        setCalendarMeals(prev => 
          prev.map(cm => 
            cm.id === mealToMove.id
              ? { ...cm, scheduledDate: destDate, mealType: destMealType as 'breakfast' | 'lunch' | 'dinner' | 'snack' }
              : cm
          )
        );
      }
    }
  };

  const removeMeal = (mealId: string) => {
    setCalendarMeals(prev => prev.filter(cm => cm.id !== mealId));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prev => addDays(prev, direction === 'next' ? 7 : -7));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Plan Your Family Meals
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Drag and drop meals to plan your week. Your grocery list will automatically update based on your planned meals.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Meal Library */}
          <div className="xl:col-span-1">
            <Card className="h-fit sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  Meal Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId="meal-library">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-3 min-h-[200px] ${
                        snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''
                      }`}
                    >
                      {mockMeals.map((meal, index) => (
                        <Draggable key={meal.id} draggableId={meal.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${
                                snapshot.isDragging ? 'shadow-lg rotate-2' : ''
                              }`}
                            >
                              <Card className="cursor-grab hover:shadow-md transition-shadow">
                                <CardContent className="p-3">
                                  <div className="flex items-center gap-3">
                                    {meal.imageUrl ? (
                                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 flex items-center justify-center">
                                        <span className="text-2xl">{meal.imageUrl}</span>
                                      </div>
                                    ) : (
                                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                        <ChefHat className="w-6 h-6 text-gray-400" />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-sm truncate">{meal.name}</h4>
                                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                        <Clock className="w-3 h-3" />
                                        {(meal.prepTimeMinutes || 0) + (meal.cookTimeMinutes || 0)}m
                                        <Users className="w-3 h-3" />
                                        {meal.serves}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Grid */}
          <div className="xl:col-span-3">
            {/* Week Navigation */}
            <div className="flex justify-between items-center mb-6">
              <Button variant="outline" onClick={() => navigateWeek('prev')}>
                ← Previous Week
              </Button>
              <h2 className="text-xl font-semibold">
                {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
              </h2>
              <Button variant="outline" onClick={() => navigateWeek('next')}>
                Next Week →
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
              {weekDays.map(day => (
                <div key={day.date} className="space-y-3">
                  {/* Day Header */}
                  <div className={`text-center p-3 rounded-lg ${
                    day.isToday ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-50'
                  }`}>
                    <div className="font-semibold">{day.dayName}</div>
                    <div className="text-lg">{day.dayNumber}</div>
                  </div>

                  {/* Meal Slots */}
                  <div className="space-y-2">
                    {mealTypes.map(mealType => {
                      const mealsInSlot = getMealsForSlot(day.date, mealType);
                      
                      return (
                        <div key={mealType}>
                          <div className="text-xs font-medium text-gray-500 mb-1 capitalize">
                            {mealType}
                          </div>
                          <Droppable droppableId={`calendar-${day.date}-${mealType}`}>
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`min-h-[60px] rounded-lg border-2 border-dashed transition-colors ${
                                  snapshot.isDraggingOver
                                    ? 'border-emerald-400 bg-emerald-50'
                                    : 'border-gray-200'
                                } ${mealsInSlot.length === 0 ? 'flex items-center justify-center' : 'p-2 space-y-2'}`}
                              >
                                {mealsInSlot.length === 0 ? (
                                  <div className="text-gray-400 text-xs">
                                    Drop meal here
                                  </div>
                                ) : (
                                  mealsInSlot.map((calendarMeal, index) => (
                                    <Draggable 
                                      key={calendarMeal.id} 
                                      draggableId={calendarMeal.id} 
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={`${
                                            snapshot.isDragging ? 'shadow-lg' : ''
                                          }`}
                                        >
                                          <Card className="cursor-grab">
                                            <CardContent className="p-2">
                                              <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                  {calendarMeal.meal.imageUrl ? (
                                                    <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 flex items-center justify-center">
                                                      <span className="text-lg">{calendarMeal.meal.imageUrl}</span>
                                                    </div>
                                                  ) : (
                                                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
                                                      <ChefHat className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                  )}
                                                  <div className="min-w-0">
                                                    <div className="text-xs font-semibold truncate">
                                                      {calendarMeal.meal.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                      Serves {calendarMeal.servingSize}
                                                    </div>
                                                  </div>
                                                </div>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeMeal(calendarMeal.id);
                                                  }}
                                                >
                                                  ×
                                                </Button>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        </div>
                                      )}
                                    </Draggable>
                                  ))
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
