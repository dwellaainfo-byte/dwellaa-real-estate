'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Maximize2, Play } from 'lucide-react';
import { PropertyImage } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface PropertyGalleryProps {
  images: PropertyImage[];
  propertyTitle: string;
  virtualTour?: string;
}

export default function PropertyGallery({ 
  images, 
  propertyTitle, 
  virtualTour 
}: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);

  const sortedImages = images.sort((a, b) => {
    if (a.isMainImage) return -1;
    if (b.isMainImage) return 1;
    return a.order - b.order;
  });

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === sortedImages.length - 1 ? 0 : prev + 1
    );
  }, [sortedImages.length]);

  const previousImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? sortedImages.length - 1 : prev - 1
    );
  }, [sortedImages.length]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (isFullscreenOpen) {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') previousImage();
      if (e.key === 'Escape') setIsFullscreenOpen(false);
    }
  }, [isFullscreenOpen, nextImage, previousImage]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (!sortedImages.length) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const currentImage = sortedImages[currentImageIndex];

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group">
          <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={currentImage.url}
              alt={currentImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            
            {/* Image Navigation Arrows */}
            {sortedImages.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} className="text-gray-700" />
                </button>
              </>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsFullscreenOpen(true)}
                className="bg-white/90 hover:bg-white"
              >
                <Maximize2 size={18} className="mr-2" />
                View Full Size
              </Button>
              
              {virtualTour && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsVirtualTourOpen(true)}
                >
                  <Play size={18} className="mr-2" />
                  Virtual Tour
                </Button>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} of {sortedImages.length}
            </div>
          </div>

          {/* Image Caption */}
          {currentImage.caption && (
            <p className="text-sm text-gray-600 mt-2 italic">
              {currentImage.caption}
            </p>
          )}
        </div>

        {/* Thumbnail Grid */}
        {sortedImages.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
            {sortedImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'ring-2 ring-luxury-gold'
                    : 'hover:opacity-80'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12.5vw"
                />
                {index === currentImageIndex && (
                  <div className="absolute inset-0 bg-luxury-gold/20" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <Modal
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        size="xl"
        showCloseButton={false}
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>

          {/* Main Image */}
          <div className="relative w-full h-[70vh]">
            <Image
              src={currentImage.url}
              alt={currentImage.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Navigation */}
          {sortedImages.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            {currentImageIndex + 1} of {sortedImages.length}
          </div>
        </div>
      </Modal>

      {/* Virtual Tour Modal */}
      {virtualTour && (
        <Modal
          isOpen={isVirtualTourOpen}
          onClose={() => setIsVirtualTourOpen(false)}
          title="Virtual Tour"
          size="xl"
        >
          <div className="aspect-video">
            <iframe
              src={virtualTour}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg"
              title={`Virtual tour of ${propertyTitle}`}
            />
          </div>
        </Modal>
      )}
    </>
  );
}