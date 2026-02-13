export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    areaUnit: 'sqft' | 'sqm';
    lotSize?: number;
    yearBuilt?: number;
    propertyType: 'house' | 'apartment' | 'villa' | 'penthouse' | 'estate' | 'condo';
  };
  images: PropertyImage[];
  features: string[];
  amenities: string[];
  status: 'active' | 'sold' | 'pending' | 'off-market';
  listingAgent: {
    name: string;
    email: string;
    phone: string;
    image?: string;
    company: string;
  };
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  virtualTour?: string;
  floorPlan?: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order: number;
  isMainImage: boolean;
}

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  location?: string;
  minArea?: number;
  maxArea?: number;
  features?: string[];
  status?: string;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
  inquiryType: 'viewing' | 'buying' | 'selling' | 'general';
}

export interface Newsletter {
  email: string;
  preferences?: {
    propertyUpdates: boolean;
    marketNews: boolean;
    exclusiveListings: boolean;
  };
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  specialties: string[];
  experience: number;
  certifications: string[];
  socialMedia: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
  performance: {
    propertiesSold: number;
    averageDaysOnMarket: number;
    customerSatisfaction: number;
  };
}

export interface Testimonial {
  id: string;
  client: {
    name: string;
    image?: string;
    location: string;
  };
  rating: number;
  comment: string;
  propertyType: string;
  date: string;
}

export interface MarketData {
  location: string;
  averagePrice: number;
  priceChange: number;
  daysOnMarket: number;
  propertiesSold: number;
  priceRange: {
    min: number;
    max: number;
  };
  lastUpdated: string;
}