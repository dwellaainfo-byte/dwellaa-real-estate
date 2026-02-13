'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Heart,
  Share2,
  Phone,
  Mail,
  Calculator,
  Eye,
  Download
} from 'lucide-react';
import { Property } from '@/types';
import { sampleProperties } from '@/data/sampleProperties';
import PropertyGallery from '@/components/property/PropertyGallery';
import ContactForm from '@/components/forms/ContactForm';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { formatPrice, formatArea, calculateMortgage } from '@/lib/utils';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMortgageCalculator, setShowMortgageCalculator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mortgage calculator state
  const [mortgageData, setMortgageData] = useState({
    downPayment: 0,
    interestRate: 3.5,
    loanTermYears: 30,
  });

  useEffect(() => {
    const loadProperty = async () => {
      try {
        // In a real app, this would be an API call using the ID
        const foundProperty = sampleProperties.find(p => p.id === params.id);
        setProperty(foundProperty || null);
      } catch (error) {
        console.error('Error loading property:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadProperty();
    }
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share && property) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const mortgageResult = property ? calculateMortgage(
    property.price,
    mortgageData.downPayment,
    mortgageData.interestRate,
    mortgageData.loanTermYears
  ) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container-luxury py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-96 bg-gray-200 rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
              <div className="h-96 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="py-16">
            <h2 className="text-2xl font-serif font-bold text-luxury-charcoal mb-4">
              Property Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="primary">
              <Link href="/properties" className="flex items-center">
                <ArrowLeft className="mr-2" size={18} />
                Browse Properties
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container-luxury py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-luxury-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-luxury-gold transition-colors">
            Properties
          </Link>
          <span>/</span>
          <span className="text-luxury-charcoal font-medium">{property.title}</span>
        </div>

        {/* Back Button */}
        <Button variant="outline" className="mb-6">
          <Link href="/properties" className="flex items-center">
            <ArrowLeft className="mr-2" size={18} />
            Back to Properties
          </Link>
        </Button>

        {/* Property Gallery */}
        <div className="mb-8">
          <PropertyGallery
            images={property.images}
            propertyTitle={property.title}
            virtualTour={property.virtualTour}
          />
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <MapPin size={18} className="text-luxury-gold" />
                  <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-charcoal mb-4">
                  {property.title}
                </h1>
                
                <div className="text-3xl sm:text-4xl font-serif font-bold text-luxury-gold mb-6">
                  {formatPrice(property.price, property.currency)}
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart 
                    size={18} 
                    className={`mr-2 ${isFavorite ? 'text-red-500 fill-red-500' : ''}`} 
                  />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 size={18} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Bed className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                <div className="text-2xl font-serif font-bold text-luxury-charcoal">
                  {property.details.bedrooms}
                </div>
                <div className="text-sm text-gray-600">
                  Bedroom{property.details.bedrooms !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Bath className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                <div className="text-2xl font-serif font-bold text-luxury-charcoal">
                  {property.details.bathrooms}
                </div>
                <div className="text-sm text-gray-600">
                  Bathroom{property.details.bathrooms !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Square className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                <div className="text-2xl font-serif font-bold text-luxury-charcoal">
                  {formatArea(property.details.area, property.details.areaUnit)}
                </div>
                <div className="text-sm text-gray-600">Living Area</div>
              </div>

              {property.details.yearBuilt && (
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Calendar className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                  <div className="text-2xl font-serif font-bold text-luxury-charcoal">
                    {property.details.yearBuilt}
                  </div>
                  <div className="text-sm text-gray-600">Year Built</div>
                </div>
              )}
            </div>

            {/* Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              {property.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-luxury-gold rounded-full" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {property.amenities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {property.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-luxury-gold rounded-full" />
                          <span className="text-gray-700">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Property Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Property Type</div>
                    <div className="font-semibold capitalize">{property.details.propertyType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <div className="font-semibold capitalize">{property.status}</div>
                  </div>
                  {property.details.lotSize && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Lot Size</div>
                      <div className="font-semibold">{property.details.lotSize} acres</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Listing ID</div>
                    <div className="font-semibold">{property.id}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Information */}
            <Card>
              <CardHeader>
                <CardTitle>Listing Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  {property.listingAgent.image && (
                    <Image
                      src={property.listingAgent.image}
                      alt={property.listingAgent.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-semibold text-luxury-charcoal mb-1">
                      {property.listingAgent.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{property.listingAgent.company}</p>
                    
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={`tel:${property.listingAgent.phone}`}
                        className="flex items-center space-x-2 text-luxury-gold hover:text-luxury-darkGold transition-colors"
                      >
                        <Phone size={16} />
                        <span>{property.listingAgent.phone}</span>
                      </a>
                      <a
                        href={`mailto:${property.listingAgent.email}`}
                        className="flex items-center space-x-2 text-luxury-gold hover:text-luxury-darkGold transition-colors"
                      >
                        <Mail size={16} />
                        <span>{property.listingAgent.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <ContactForm 
              propertyId={property.id} 
              propertyTitle={property.title}
              compact
            />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowMortgageCalculator(true)}
                >
                  <Calculator size={18} className="mr-2" />
                  Mortgage Calculator
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Eye size={18} className="mr-2" />
                  Schedule Virtual Tour
                </Button>
                
                {property.floorPlan && (
                  <Button variant="outline" className="w-full justify-start">
                    <Download size={18} className="mr-2" />
                    Download Floor Plan
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Key Information */}
            <Card>
              <CardHeader>
                <CardTitle>Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Price per sq ft</div>
                  <div className="font-semibold">
                    ${Math.round(property.price / property.details.area).toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Days on Market</div>
                  <div className="font-semibold">
                    {Math.floor((new Date().getTime() - new Date(property.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Property Type</div>
                  <div className="font-semibold capitalize">{property.details.propertyType}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mortgage Calculator Modal */}
      <Modal
        isOpen={showMortgageCalculator}
        onClose={() => setShowMortgageCalculator(false)}
        title="Mortgage Calculator"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-lg font-semibold text-luxury-charcoal">
              Property Price: {formatPrice(property.price, property.currency)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Down Payment ($)
              </label>
              <input
                type="number"
                value={mortgageData.downPayment}
                onChange={(e) => setMortgageData({
                  ...mortgageData,
                  downPayment: Number(e.target.value)
                })}
                className="input-luxury"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={mortgageData.interestRate}
                onChange={(e) => setMortgageData({
                  ...mortgageData,
                  interestRate: Number(e.target.value)
                })}
                className="input-luxury"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (years)
              </label>
              <select
                value={mortgageData.loanTermYears}
                onChange={(e) => setMortgageData({
                  ...mortgageData,
                  loanTermYears: Number(e.target.value)
                })}
                className="input-luxury"
              >
                <option value={15}>15 years</option>
                <option value={30}>30 years</option>
              </select>
            </div>
          </div>

          {mortgageResult && (
            <div className="bg-luxury-cream p-6 rounded-lg">
              <h3 className="text-lg font-serif font-semibold mb-4">Estimated Monthly Payment</h3>
              <div className="text-3xl font-serif font-bold text-luxury-gold mb-4">
                ${mortgageResult.monthlyPayment.toLocaleString()}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Principal & Interest</div>
                  <div className="font-semibold">${mortgageResult.monthlyPayment.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600">Total Interest Paid</div>
                  <div className="font-semibold">${mortgageResult.totalInterest.toLocaleString()}</div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                *This calculator provides estimates only. Actual payments may vary based on taxes, insurance, and other factors.
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}