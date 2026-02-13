'use client';

import React, { useState } from 'react';
import { Search, MapPin, Home, Bed, Bath, DollarSign, Square, Filter, X } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export default function SearchFilters({
  filters,
  onFiltersChange,
  onSearch,
  isLoading = false,
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'estate', label: 'Estate' },
    { value: 'condo', label: 'Condo' },
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  const bathroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
  ];

  const priceRanges = [
    { min: undefined, max: undefined, label: 'Any Price' },
    { min: undefined, max: 1000000, label: 'Under $1M' },
    { min: 1000000, max: 2500000, label: '$1M - $2.5M' },
    { min: 2500000, max: 5000000, label: '$2.5M - $5M' },
    { min: 5000000, max: 10000000, label: '$5M - $10M' },
    { min: 10000000, max: undefined, label: 'Over $10M' },
  ];

  const popularFeatures = [
    'Ocean Views',
    'Swimming Pool',
    'Home Theater',
    'Wine Cellar',
    'Gym/Fitness',
    'Guest House',
    'Private Beach',
    'Elevator',
    'Smart Home',
    'Fireplace',
  ];

  const handleLocalFilterChange = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handlePriceRangeChange = (min?: number, max?: number) => {
    const newFilters = { ...localFilters, minPrice: min, maxPrice: max };
    setLocalFilters(newFilters);
  };

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = localFilters.features || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    handleLocalFilterChange('features', newFeatures);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onSearch();
  };

  const clearFilters = () => {
    const emptyFilters: SearchFiltersType = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = Object.keys(localFilters).some(key => {
    const value = localFilters[key as keyof SearchFiltersType];
    return value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true);
  });

  return (
    <Card className="mb-8">
      {/* Quick Search Bar */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by location, property type, or keywords..."
              value={localFilters.location || ''}
              onChange={(e) => handleLocalFilterChange('location', e.target.value)}
              icon={<Search />}
              className="text-lg py-4"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="whitespace-nowrap"
            >
              <Filter size={18} className="mr-2" />
              {showAdvanced ? 'Hide' : 'Advanced'}
            </Button>
            <Button
              onClick={applyFilters}
              loading={isLoading}
              className="whitespace-nowrap"
            >
              <Search size={18} className="mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t pt-6 space-y-6">
          {/* Quick Price Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Price Range
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handlePriceRangeChange(range.min, range.max)}
                  className={`filter-chip ${
                    localFilters.minPrice === range.min && localFilters.maxPrice === range.max
                      ? 'filter-chip-active'
                      : ''
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Price Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Minimum Price"
              type="number"
              placeholder="$ Min"
              value={localFilters.minPrice || ''}
              onChange={(e) => handleLocalFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              icon={<DollarSign />}
            />
            <Input
              label="Maximum Price"
              type="number"
              placeholder="$ Max"
              value={localFilters.maxPrice || ''}
              onChange={(e) => handleLocalFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              icon={<DollarSign />}
            />
          </div>

          {/* Property Type and Rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={localFilters.propertyType || ''}
                onChange={(e) => handleLocalFilterChange('propertyType', e.target.value || undefined)}
                className="input-luxury"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                value={localFilters.bedrooms || ''}
                onChange={(e) => handleLocalFilterChange('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
                className="input-luxury"
              >
                {bedroomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <select
                value={localFilters.bathrooms || ''}
                onChange={(e) => handleLocalFilterChange('bathrooms', e.target.value ? Number(e.target.value) : undefined)}
                className="input-luxury"
              >
                {bathroomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Min Area (sq ft)"
              type="number"
              placeholder="Min area"
              value={localFilters.minArea || ''}
              onChange={(e) => handleLocalFilterChange('minArea', e.target.value ? Number(e.target.value) : undefined)}
              icon={<Square />}
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Features & Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {popularFeatures.map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleFeatureToggle(feature)}
                  className={`filter-chip text-left ${
                    (localFilters.features || []).includes(feature)
                      ? 'filter-chip-active'
                      : ''
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
            <div className="text-sm text-gray-500">
              {hasActiveFilters && 'Active filters applied'}
            </div>
            
            <div className="flex gap-3">
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="whitespace-nowrap"
                >
                  <X size={16} className="mr-2" />
                  Clear All
                </Button>
              )}
              <Button
                onClick={applyFilters}
                loading={isLoading}
                className="whitespace-nowrap"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}