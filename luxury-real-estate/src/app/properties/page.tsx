'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Grid, List, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Property, SearchFilters as SearchFiltersType } from '@/types';
import { sampleProperties } from '@/data/sampleProperties';
import PropertyCard from '@/components/property/PropertyCard';
import SearchFilters from '@/components/search/SearchFilters';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'price-high' | 'price-low' | 'area-high' | 'area-low';

export default function PropertiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const propertiesPerPage = 12;

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: SearchFiltersType = {};
    
    if (searchParams.get('location')) {
      initialFilters.location = searchParams.get('location')!;
    }
    if (searchParams.get('type')) {
      initialFilters.propertyType = searchParams.get('type')!;
    }
    if (searchParams.get('minPrice')) {
      initialFilters.minPrice = Number(searchParams.get('minPrice'));
    }
    if (searchParams.get('maxPrice')) {
      initialFilters.maxPrice = Number(searchParams.get('maxPrice'));
    }
    if (searchParams.get('bedrooms')) {
      initialFilters.bedrooms = Number(searchParams.get('bedrooms'));
    }
    
    setFilters(initialFilters);
  }, [searchParams]);

  // Load properties
  useEffect(() => {
    const loadProperties = async () => {
      try {
        // In a real app, this would be an API call
        setProperties(sampleProperties);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading properties:', error);
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Filter and sort properties
  const processedProperties = useMemo(() => {
    let result = [...properties];

    // Apply filters
    if (filters.location) {
      result = result.filter(property => 
        property.location.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
        property.location.state.toLowerCase().includes(filters.location!.toLowerCase()) ||
        property.location.address.toLowerCase().includes(filters.location!.toLowerCase()) ||
        property.title.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.propertyType) {
      result = result.filter(property => 
        property.details.propertyType === filters.propertyType
      );
    }

    if (filters.minPrice) {
      result = result.filter(property => property.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      result = result.filter(property => property.price <= filters.maxPrice!);
    }

    if (filters.bedrooms) {
      result = result.filter(property => property.details.bedrooms >= filters.bedrooms!);
    }

    if (filters.bathrooms) {
      result = result.filter(property => property.details.bathrooms >= filters.bathrooms!);
    }

    if (filters.minArea) {
      result = result.filter(property => property.details.area >= filters.minArea!);
    }

    if (filters.features && filters.features.length > 0) {
      result = result.filter(property => 
        filters.features!.some(feature => 
          property.features.includes(feature) || property.amenities.includes(feature)
        )
      );
    }

    if (filters.status) {
      result = result.filter(property => property.status === filters.status);
    } else {
      // Default to active properties only
      result = result.filter(property => property.status === 'active');
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'area-high':
        result.sort((a, b) => b.details.area - a.details.area);
        break;
      case 'area-low':
        result.sort((a, b) => a.details.area - b.details.area);
        break;
    }

    return result;
  }, [properties, filters, sortBy]);

  // Pagination
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    return processedProperties.slice(startIndex, startIndex + propertiesPerPage);
  }, [processedProperties, currentPage]);

  const totalPages = Math.ceil(processedProperties.length / propertiesPerPage);

  // Handlers
  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Update URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0)) {
        params.set(key, String(value));
      }
    });
    
    router.push(`/properties?${params.toString()}`, { scroll: false });
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-high', label: 'Highest Price' },
    { value: 'price-low', label: 'Lowest Price' },
    { value: 'area-high', label: 'Largest Area' },
    { value: 'area-low', label: 'Smallest Area' },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container-luxury py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-luxury-charcoal mb-4">
            Luxury Properties
          </h1>
          <p className="text-xl text-gray-600">
            Discover exceptional homes in the world's most desirable locations
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <p className="text-gray-600">
              {isLoading ? (
                'Searching...'
              ) : (
                <>
                  <span className="font-semibold">{processedProperties.length}</span>{' '}
                  {processedProperties.length === 1 ? 'property' : 'properties'} found
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={18} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-luxury-gold text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-luxury-gold text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {isLoading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-lg" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : processedProperties.length === 0 ? (
          <Card className="text-center py-16">
            <div className="max-w-md mx-auto">
              <SlidersHorizontal className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-gray-700 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search filters or browse all available properties.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({});
                  setCurrentPage(1);
                  router.push('/properties');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
              {paginatedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  featured={false}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    const isCurrentPage = page === currentPage;
                    const showPage = page === 1 || page === totalPages || 
                      (page >= currentPage - 2 && page <= currentPage + 2);
                    
                    if (!showPage) {
                      if (page === currentPage - 3 || page === currentPage + 3) {
                        return <span key={page} className="px-2">...</span>;
                      }
                      return null;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          isCurrentPage
                            ? 'bg-luxury-gold text-white'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}