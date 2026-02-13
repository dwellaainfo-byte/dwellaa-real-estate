'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Bed, Bath, Square, Calendar } from 'lucide-react';
import { Property } from '@/types';
import { formatPrice, formatArea, getPropertyUrl } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const mainImage = property.images.find(img => img.isMainImage) || property.images[0];
  const propertyUrl = getPropertyUrl(property);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card 
      padding="none" 
      hover 
      className="property-card"
    >
      <Link href={propertyUrl} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {mainImage && !imageError ? (
            <Image
              src={mainImage.url}
              alt={mainImage.alt}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
              priority={featured}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}

          {/* Overlay Elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}

          {/* Status Badge */}
          {property.status !== 'active' && (
            <div className="absolute top-4 right-16">
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                property.status === 'sold' 
                  ? 'bg-green-500 text-white' 
                  : property.status === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}>
                {property.status}
              </span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <Heart 
              size={20} 
              className={`transition-colors duration-200 ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'
              }`} 
            />
          </button>

          {/* Price Overlay (visible on hover) */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="property-price text-lg">
                {formatPrice(property.price, property.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-6">
          {/* Location */}
          <div className="flex items-center space-x-2 mb-3">
            <MapPin size={16} className="text-luxury-gold flex-shrink-0" />
            <span className="property-location truncate">
              {property.location.city}, {property.location.state}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-serif font-semibold text-luxury-charcoal mb-3 line-clamp-2 ${
            featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          }`}>
            {property.title}
          </h3>

          {/* Price */}
          <div className="property-price mb-4">
            {formatPrice(property.price, property.currency)}
          </div>

          {/* Property Stats */}
          <div className="property-details mb-4">
            <div className="flex items-center space-x-1">
              <Bed size={16} />
              <span>{property.details.bedrooms} bed{property.details.bedrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath size={16} />
              <span>{property.details.bathrooms} bath{property.details.bathrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square size={16} />
              <span>{formatArea(property.details.area, property.details.areaUnit)}</span>
            </div>
            {property.details.yearBuilt && (
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{property.details.yearBuilt}</span>
              </div>
            )}
          </div>

          {/* Description (featured properties only) */}
          {featured && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {property.description}
            </p>
          )}

          {/* Key Features */}
          {property.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Key Features:</h4>
              <div className="flex flex-wrap gap-2">
                {property.features.slice(0, featured ? 6 : 3).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
                  >
                    {feature}
                  </span>
                ))}
                {property.features.length > (featured ? 6 : 3) && (
                  <span className="px-2 py-1 text-gray-500 text-sm">
                    +{property.features.length - (featured ? 6 : 3)} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}