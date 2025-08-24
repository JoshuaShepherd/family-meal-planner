'use client';

import { useState, useMemo } from 'react';
import { mockShoppingListItems, mockShoppingList, getCategoryInfo, INGREDIENT_CATEGORIES } from '@/data/mockData';
import { ShoppingListItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ShoppingCart, 
  Plus, 
  Clock, 
  AlertTriangle, 
  Package,
  RefreshCw,
  Filter
} from 'lucide-react';

type ViewFilter = 'all' | 'this-trip' | 'stock-up' | 'urgent';

export function ShoppingListView() {
  const [items, setItems] = useState<ShoppingListItem[]>(mockShoppingListItems);
  const [viewFilter, setViewFilter] = useState<ViewFilter>('this-trip');
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  // Filter items based on current view and category
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply view filter
    switch (viewFilter) {
      case 'this-trip':
        filtered = filtered.filter(item => item.priority === 'normal' || item.priority === 'urgent');
        break;
      case 'stock-up':
        filtered = filtered.filter(item => item.priority === 'stock-up');
        break;
      case 'urgent':
        filtered = filtered.filter(item => item.priority === 'urgent');
        break;
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => selectedCategories.includes(item.category));
    }

    // Apply completion filter
    if (!showCompleted) {
      filtered = filtered.filter(item => !item.checked);
    }

    return filtered;
  }, [items, viewFilter, selectedCategories, showCompleted]);

  // Group items by category
  const itemsByCategory = useMemo(() => {
    const grouped = filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, ShoppingListItem[]>);

    // Sort categories by a predefined order
    const categoryOrder = ['produce', 'meat', 'dairy', 'bakery', 'pantry', 'frozen', 'snacks'];
    const sortedEntries = Object.entries(grouped).sort(([a], [b]) => {
      const aIndex = categoryOrder.indexOf(a);
      const bIndex = categoryOrder.indexOf(b);
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    return sortedEntries;
  }, [filteredItems]);

  // Statistics
  const stats = useMemo(() => {
    const total = items.length;
    const checked = items.filter(item => item.checked).length;
    const urgent = items.filter(item => item.priority === 'urgent' && !item.checked).length;
    const estimatedTotal = items
      .filter(item => !item.checked)
      .reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);

    return { total, checked, urgent, estimatedTotal };
  }, [items]);

  const toggleItem = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            checked: !item.checked,
            checkedAt: !item.checked ? new Date().toISOString() : undefined
          }
        : item
    ));
  };

  const updateItemPriority = (itemId: string, priority: ShoppingListItem['priority']) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, priority } : item
    ));
  };

  const generateFromMeals = () => {
    // In a real app, this would fetch from calendar meals
    // For now, we'll just refresh the mock data
    window.location.reload();
  };

  const addNewItem = () => {
    if (!newItemName.trim()) return;

    const newItem: ShoppingListItem = {
      id: Date.now().toString(),
      listId: mockShoppingList.id,
      ingredient: {
        id: Date.now().toString(),
        name: newItemName,
        category: 'pantry',
        defaultUnit: 'items',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      quantity: 1,
      unit: 'items',
      priority: 'normal',
      category: 'pantry',
      checked: false,
      addedManually: true,
      createdAt: new Date().toISOString(),
    };

    setItems(prev => [...prev, newItem]);
    setNewItemName('');
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getPriorityIcon = (priority: ShoppingListItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'stock-up':
        return <Package className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: ShoppingListItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 border-red-200';
      case 'stock-up':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Family Shopping List
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your smart grocery list automatically generated from your planned meals, plus manual additions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Trip Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-semibold">{stats.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{stats.checked}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Urgent</span>
                  <span className="font-semibold text-red-600">{stats.urgent}</span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span className="text-gray-600">Est. Total</span>
                  <span className="font-semibold">${stats.estimatedTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${(stats.checked / stats.total) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* View Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">View</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={viewFilter === 'this-trip' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewFilter('this-trip')}
                    className="text-xs"
                  >
                    This Trip
                  </Button>
                  <Button
                    variant={viewFilter === 'stock-up' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewFilter('stock-up')}
                    className="text-xs"
                  >
                    Stock Up
                  </Button>
                  <Button
                    variant={viewFilter === 'urgent' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewFilter('urgent')}
                    className="text-xs"
                  >
                    Urgent
                  </Button>
                  <Button
                    variant={viewFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewFilter('all')}
                    className="text-xs"
                  >
                    All Items
                  </Button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Categories</label>
                <div className="space-y-1">
                  {INGREDIENT_CATEGORIES.map(category => (
                    <div key={category.name} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.name}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() => toggleCategory(category.name)}
                      />
                      <label
                        htmlFor={category.name}
                        className="text-sm cursor-pointer flex items-center gap-2"
                      >
                        <span>{category.icon}</span>
                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Show Completed */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-completed"
                  checked={showCompleted}
                  onCheckedChange={(checked) => setShowCompleted(checked === true)}
                />
                <label htmlFor="show-completed" className="text-sm cursor-pointer">
                  Show completed items
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={generateFromMeals}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate from Meals
              </Button>

              <div className="space-y-2">
                <Input
                  placeholder="Add item..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addNewItem()}
                />
                <Button onClick={addNewItem} className="w-full" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Shopping List */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {itemsByCategory.map(([category, categoryItems]) => {
              const categoryInfo = getCategoryInfo(category);
              
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{categoryInfo.icon}</span>
                      <span className="capitalize">{category}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {categoryItems.filter(item => !item.checked).length} / {categoryItems.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categoryItems.map(item => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                            getPriorityColor(item.priority)
                          } ${item.checked ? 'opacity-60' : ''}`}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(item.id)}
                          />

                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            {item.ingredient.imageUrl ? (
                              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-200">
                                <span className="text-2xl">{item.ingredient.imageUrl}</span>
                              </div>
                            ) : (
                              <div className={`w-full h-full ${categoryInfo.color} flex items-center justify-center`}>
                                <span className="text-lg">{categoryInfo.icon}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}>
                              {item.quantity} {item.unit} {item.ingredient.name}
                            </div>
                            {item.notes && (
                              <div className="text-sm text-gray-500 mt-1">{item.notes}</div>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              {getPriorityIcon(item.priority)}
                              {item.addedManually && (
                                <Badge variant="outline" className="text-xs">
                                  Manual
                                </Badge>
                              )}
                              {item.estimatedPrice && (
                                <span className="text-sm text-gray-500">
                                  ${item.estimatedPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Priority Toggle */}
                          <div className="flex gap-1">
                            <Button
                              variant={item.priority === 'urgent' ? 'destructive' : 'outline'}
                              size="sm"
                              onClick={() => updateItemPriority(
                                item.id, 
                                item.priority === 'urgent' ? 'normal' : 'urgent'
                              )}
                            >
                              <AlertTriangle className="w-3 h-3" />
                            </Button>
                            <Button
                              variant={item.priority === 'stock-up' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateItemPriority(
                                item.id,
                                item.priority === 'stock-up' ? 'normal' : 'stock-up'
                              )}
                            >
                              <Package className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {itemsByCategory.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No items in this view
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or generate items from your planned meals
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
