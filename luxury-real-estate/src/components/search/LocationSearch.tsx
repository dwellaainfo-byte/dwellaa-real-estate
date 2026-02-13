'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchLocations, Location } from '@/data/locations';

interface LocationSearchProps {
  className?: string;
  placeholder?: string;
}

export default function LocationSearch({ 
  className = '', 
  placeholder = 'Monaco, Nice, Cannes, Postal Code (06190) or Property ID' 
}: LocationSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  useEffect(() => {
    if (searchValue.trim()) {
      const results = searchLocations(searchValue);
      setSuggestions(results);
    } else {
      setSuggestions(searchLocations('')); // Show popular locations
    }
  }, [searchValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      window.location.href = `/properties?search=${encodeURIComponent(searchValue)}`;
    }
  };

  const handleSuggestionClick = (location: Location) => {
    setSearchValue(`${location.name} ${location.postalCode}`);
    setIsFocused(false);
  };

  const popularLocations = [
    { name: 'Monaco', flag: '🇲🇨', postalCode: '98000' },
    { name: 'Nice', flag: '🇫🇷', postalCode: '06000' },
    { name: 'Cannes', flag: '🇫🇷', postalCode: '06400' },
    { name: 'Roquebrune-Cap-Martin', flag: '🇫🇷', postalCode: '06190' },
    { name: 'Saint-Jean-Cap-Ferrat', flag: '🇫🇷', postalCode: '06230' },
    { name: 'Antibes', flag: '🇫🇷', postalCode: '06160' },
  ];

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin size={24} />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={placeholder}
            className="w-full pl-16 pr-16 py-6 text-xl font-medium border-3 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all bg-white shadow-lg hover:shadow-xl"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            <Search size={24} />
          </button>
        </div>
      </form>

      {/* Search Suggestions */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 py-6 z-50 max-h-96 overflow-y-auto">
          <div className="px-6 pb-4">
            <h4 className="text-lg font-bold text-gray-800 mb-4">
              {searchValue.trim() ? 'Search Results' : 'Popular Locations'}
            </h4>
            
            {!searchValue.trim() && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {popularLocations.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchValue(`${location.name} ${location.postalCode}`);
                      setIsFocused(false);
                    }}
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-blue-50 text-left transition-colors border border-gray-100 hover:border-blue-200"
                  >
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <div className="font-semibold text-gray-800">{location.name}</div>
                      <div className="text-sm text-gray-500">{location.postalCode}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchValue.trim() && suggestions.length > 0 && (
              <div className="space-y-2">
                {suggestions.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(location)}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-blue-50 text-left transition-colors border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin size={20} className="text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-800">
                          {location.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {location.region && `${location.region}, `}{location.country}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      {location.postalCode}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchValue.trim() && suggestions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MapPin size={32} className="mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium">No locations found</p>
                <p className="text-sm">Try searching for Monaco, Nice, or a postal code like "06190"</p>
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-100 pt-4 px-6">
            <p className="text-sm text-gray-500">
              💡 <strong>Search tips:</strong> Try "Monaco", "06190", "Roquebrune", or property ID
            </p>
          </div>
        </div>
      )}
    </div>
  );
}