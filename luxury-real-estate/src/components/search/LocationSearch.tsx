'use client';

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface LocationSearchProps {
  className?: string;
  placeholder?: string;
}

export default function LocationSearch({ 
  className = '', 
  placeholder = 'Country, City, Address, Postal Code or ID' 
}: LocationSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Here you would implement actual search logic
      console.log('Searching for:', searchValue);
      // Redirect to properties page with search query
      window.location.href = `/properties?search=${encodeURIComponent(searchValue)}`;
    }
  };

  const suggestedSearches = [
    '🇫🇷 Paris, France',
    '🇮🇹 Rome, Italy', 
    '🇺🇸 New York, USA',
    '🇬🇧 London, UK',
    '🇨🇭 Geneva, Switzerland',
  ];

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin size={20} />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {/* Search Suggestions */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50">
          <div className="px-4 pb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</h4>
            <div className="space-y-2">
              {suggestedSearches.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchValue(suggestion.replace(/🇫🇷|🇮🇹|🇺🇸|🇬🇧|🇨🇭/g, '').trim());
                    setIsFocused(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3 px-4">
            <p className="text-xs text-gray-500">
              Search by country, city, address, postal code or property ID
            </p>
          </div>
        </div>
      )}
    </div>
  );
}