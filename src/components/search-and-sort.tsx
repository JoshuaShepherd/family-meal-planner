'use client';

import { useState } from 'react';
import { Search, SortAsc, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export type SortOption = {
  value: string;
  label: string;
};

export type FilterOption = {
  value: string;
  label: string;
  icon?: string;
  color?: string;
};

interface SearchAndSortProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  sortOptions: SortOption[];
  filterOptions?: FilterOption[];
  selectedFilters?: string[];
  onFilterChange?: (filters: string[]) => void;
  placeholder?: string;
  resultsCount?: number;
  showFilters?: boolean;
}

export function SearchAndSort({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOptions,
  filterOptions = [],
  selectedFilters = [],
  onFilterChange,
  placeholder = 'Search...',
  resultsCount,
  showFilters = true,
}: SearchAndSortProps) {
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleFilterToggle = (filterValue: string) => {
    if (!onFilterChange) return;
    
    if (selectedFilters.includes(filterValue)) {
      onFilterChange(selectedFilters.filter(f => f !== filterValue));
    } else {
      onFilterChange([...selectedFilters, filterValue]);
    }
  };

  const clearAllFilters = () => {
    if (onFilterChange) {
      onFilterChange([]);
    }
    onSearchChange('');
  };

  const hasActiveFilters = searchQuery || selectedFilters.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => onSearchChange('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-gray-500" />
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Toggle */}
        {showFilters && filterOptions.length > 0 && (
          <Button
            variant={showFilterPanel ? 'default' : 'outline'}
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedFilters.length}
              </Badge>
            )}
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilterPanel && filterOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border rounded-lg p-4 bg-gray-50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Filter Options</h3>
              {selectedFilters.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {filterOptions.map(filter => {
                const isSelected = selectedFilters.includes(filter.value);
                return (
                  <motion.div
                    key={filter.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterToggle(filter.value)}
                      className={`w-full justify-start ${
                        isSelected ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                      } ${filter.color || ''}`}
                    >
                      {filter.icon && <span className="mr-2">{filter.icon}</span>}
                      {filter.label}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      {(hasActiveFilters || typeof resultsCount === 'number') && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between text-sm text-gray-600 bg-emerald-50 border border-emerald-200 rounded-lg p-3"
        >
          <div className="flex items-center gap-2">
            {typeof resultsCount === 'number' && (
              <span className="font-medium">
                {resultsCount} result{resultsCount !== 1 ? 's' : ''}
              </span>
            )}
            {hasActiveFilters && (
              <span>
                {searchQuery && `matching "${searchQuery}"`}
                {searchQuery && selectedFilters.length > 0 && ' and '}
                {selectedFilters.length > 0 && `filtered by ${selectedFilters.length} categor${selectedFilters.length !== 1 ? 'ies' : 'y'}`}
              </span>
            )}
          </div>
          
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </motion.div>
      )}

      {/* Active Filters Display */}
      {selectedFilters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {selectedFilters.map(filterValue => {
            const filter = filterOptions.find(f => f.value === filterValue);
            if (!filter) return null;
            
            return (
              <motion.div
                key={filterValue}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100 hover:text-red-800 transition-colors"
                  onClick={() => handleFilterToggle(filterValue)}
                >
                  {filter.icon && <span className="mr-1">{filter.icon}</span>}
                  {filter.label}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}