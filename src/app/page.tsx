'use client';

import { useState } from 'react';
import { MealPlanner } from '@/components/meal-planner';
import { ShoppingListView } from '@/components/shopping-list';
import { MealSelector } from '@/components/meal-selector';
import { Button } from '@/components/ui/button';

type View = 'selector' | 'planner' | 'shopping';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('selector');

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header Navigation */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                🍽️ FamilyMeals
              </div>
            </div>
            
            <nav className="flex space-x-1">
              <Button
                variant={currentView === 'selector' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('selector')}
                className="relative"
              >
                🎯 Meal Selector
              </Button>
              <Button
                variant={currentView === 'planner' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('planner')}
                className="relative"
              >
                📅 Meal Planner
              </Button>
              <Button
                variant={currentView === 'shopping' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('shopping')}
                className="relative"
              >
                🛒 Shopping List
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/cleaning', '_blank')}
                className="relative bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 border-purple-300"
              >
                🧹 Cleaning Sprint
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'selector' && <MealSelector />}
        {currentView === 'planner' && <MealPlanner />}
        {currentView === 'shopping' && <ShoppingListView />}
      </div>
    </main>
  );
}
