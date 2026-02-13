'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PropertyFavoriteButtonProps {
  propertyId: string;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PropertyFavoriteButton({ 
  propertyId, 
  className = '',
  showText = false,
  size = 'md'
}: PropertyFavoriteButtonProps) {
  const { user, isAuthenticated, addToFavorites, removeFromFavorites } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);

  const isFavorited = user?.favoriteProperties.includes(propertyId) || false;

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const buttonSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // TODO: Show sign in modal
      console.log('Please sign in to save favorites');
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isFavorited) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`
        ${buttonSizes[size]} 
        rounded-full 
        flex items-center justify-center
        transition-all duration-200
        ${isFavorited 
          ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
          : 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 shadow-md'
        }
        ${isAnimating ? 'scale-110' : 'scale-100'}
        backdrop-blur-sm
        ${className}
      `}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        size={iconSizes[size]} 
        className={`transition-all duration-200 ${
          isFavorited ? 'fill-current' : ''
        } ${isAnimating ? 'scale-125' : 'scale-100'}`}
      />
      {showText && (
        <span className="ml-2 text-sm font-medium">
          {isFavorited ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}