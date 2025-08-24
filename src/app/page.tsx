'use client';

import { useState } from 'react';
import { MealPlanner } from '@/components/meal-planner';
import { ShoppingListView } from '@/components/shopping-list';
import { MealSelector } from '@/components/meal-selector';
import { Button } from '@/components/ui/button';

type View = 'selector' | 'planner' | 'shopping';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('selector');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                  <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <nav className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg rounded-lg mt-2 border border-gray-200/50 shadow-lg">
              <Button
                variant={currentView === 'selector' ? 'default' : 'ghost'}
                onClick={() => {
                  setCurrentView('selector');
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-left"
              >
                🎯 Meal Selector
              </Button>
              <Button
                variant={currentView === 'planner' ? 'default' : 'ghost'}
                onClick={() => {
                  setCurrentView('planner');
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-left"
              >
                📅 Meal Planner
              </Button>
              <Button
                variant={currentView === 'shopping' ? 'default' : 'ghost'}
                onClick={() => {
                  setCurrentView('shopping');
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-left"
              >
                🛒 Shopping List
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  window.open('/cleaning', '_blank');
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-left bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 border-purple-300"
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
