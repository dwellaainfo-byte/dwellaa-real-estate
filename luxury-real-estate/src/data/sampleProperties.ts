import { Property, Agent, Testimonial } from '@/types';

export const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Magnificent Oceanfront Estate',
    description: 'Discover this extraordinary oceanfront estate offering unparalleled luxury and breathtaking panoramic views. This architectural masterpiece spans over 8,500 square feet and features the finest finishes and amenities.',
    price: 12500000,
    currency: 'USD',
    location: {
      address: '1255 Ocean Drive',
      city: 'Malibu',
      state: 'California',
      country: 'United States',
      zipCode: '90265',
      coordinates: { lat: 34.0259, lng: -118.7798 }
    },
    details: {
      bedrooms: 6,
      bathrooms: 8,
      area: 8500,
      areaUnit: 'sqft',
      lotSize: 2.5,
      yearBuilt: 2019,
      propertyType: 'estate'
    },
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
        alt: 'Oceanfront estate exterior view',
        order: 0,
        isMainImage: true
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
        alt: 'Living room with ocean views',
        order: 1,
        isMainImage: false
      },
      {
        id: '1-3',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
        alt: 'Master bedroom suite',
        order: 2,
        isMainImage: false
      }
    ],
    features: ['Ocean Views', 'Private Beach Access', 'Wine Cellar', 'Home Theater', 'Infinity Pool', 'Guest House'],
    amenities: ['Concierge Service', 'Valet Parking', 'Private Elevator', 'Smart Home Technology'],
    status: 'active',
    listingAgent: {
      name: 'Sarah Mitchell',
      email: 'sarah@luxuryproperties.com',
      phone: '+1 (310) 555-0123',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
      company: 'Luxury Properties International'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    featured: true
  },
  {
    id: '2',
    title: 'Penthouse with City Skyline Views',
    description: 'Luxurious penthouse apartment in the heart of Manhattan featuring floor-to-ceiling windows, premium finishes, and stunning city skyline views. This residence epitomizes urban sophistication.',
    price: 8750000,
    currency: 'USD',
    location: {
      address: '432 Park Avenue, Unit PH',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      zipCode: '10016',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    details: {
      bedrooms: 4,
      bathrooms: 5,
      area: 4200,
      areaUnit: 'sqft',
      yearBuilt: 2015,
      propertyType: 'penthouse'
    },
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
        alt: 'Penthouse living area with city views',
        order: 0,
        isMainImage: true
      },
      {
        id: '2-2',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
        alt: 'Modern kitchen with premium appliances',
        order: 1,
        isMainImage: false
      }
    ],
    features: ['City Views', 'Private Terrace', 'Fireplace', 'Walk-in Closets', 'High Ceilings'],
    amenities: ['24/7 Doorman', 'Fitness Center', 'Rooftop Garden', 'Valet Service'],
    status: 'active',
    listingAgent: {
      name: 'Michael Chen',
      email: 'michael@luxuryproperties.com',
      phone: '+1 (212) 555-0456',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      company: 'Luxury Properties International'
    },
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    featured: true
  },
  {
    id: '3',
    title: 'Historic French Château',
    description: 'Magnificent 18th-century château nestled in the Loire Valley, completely restored while preserving its original grandeur. This exceptional property offers timeless elegance and modern luxury.',
    price: 15200000,
    currency: 'EUR',
    location: {
      address: 'Château de Lumière',
      city: 'Amboise',
      state: 'Centre-Val de Loire',
      country: 'France',
      zipCode: '37400',
      coordinates: { lat: 47.4119, lng: 0.9819 }
    },
    details: {
      bedrooms: 12,
      bathrooms: 10,
      area: 1500,
      areaUnit: 'sqm',
      lotSize: 25,
      yearBuilt: 1785,
      propertyType: 'estate'
    },
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop',
        alt: 'Historic château exterior',
        order: 0,
        isMainImage: true
      },
      {
        id: '3-2',
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop',
        alt: 'Grand ballroom interior',
        order: 1,
        isMainImage: false
      }
    ],
    features: ['Historic Architecture', 'Vineyard', 'Chapel', 'Stables', 'Formal Gardens', 'Library'],
    amenities: ['Staff Quarters', 'Wine Cave', 'Helipad', 'Guest Cottages'],
    status: 'active',
    listingAgent: {
      name: 'Claire Dubois',
      email: 'claire@luxuryproperties.fr',
      phone: '+33 1 42 86 83 00',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
      company: 'Luxury Properties Europe'
    },
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    featured: true
  }
];

export const sampleAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Sarah Mitchell',
    email: 'sarah@luxuryproperties.com',
    phone: '+1 (310) 555-0123',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    bio: 'With over 15 years of experience in luxury real estate, Sarah specializes in oceanfront properties and has a proven track record of closing multi-million dollar deals.',
    specialties: ['Oceanfront Properties', 'Luxury Estates', 'Investment Properties'],
    experience: 15,
    certifications: ['Certified Luxury Home Marketing Specialist', 'Resort & Second Home Property Specialist'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarahmitchell',
      instagram: 'https://instagram.com/sarahmitchellre'
    },
    performance: {
      propertiesSold: 247,
      averageDaysOnMarket: 45,
      customerSatisfaction: 4.9
    }
  },
  {
    id: 'agent-2',
    name: 'Michael Chen',
    email: 'michael@luxuryproperties.com',
    phone: '+1 (212) 555-0456',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    bio: 'Michael is a Manhattan luxury real estate expert with deep knowledge of the NYC market and extensive network of high-net-worth clients.',
    specialties: ['Manhattan Penthouses', 'Commercial Properties', 'International Clients'],
    experience: 12,
    certifications: ['Graduate Realtor Institute', 'Certified International Property Specialist'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      twitter: 'https://twitter.com/michaelchennyc'
    },
    performance: {
      propertiesSold: 189,
      averageDaysOnMarket: 38,
      customerSatisfaction: 4.8
    }
  }
];

export const sampleTestimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    client: {
      name: 'Jonathan Harrison',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      location: 'Beverly Hills, CA'
    },
    rating: 5,
    comment: 'Sarah made our dream home a reality. Her expertise in luxury properties and attention to detail is unmatched. The entire process was seamless.',
    propertyType: 'Luxury Estate',
    date: '2024-01-10'
  },
  {
    id: 'testimonial-2',
    client: {
      name: 'Elizabeth Thompson',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=100&h=100&fit=crop',
      location: 'Manhattan, NY'
    },
    rating: 5,
    comment: 'Michael\'s knowledge of the Manhattan market is incredible. He helped us find the perfect penthouse and negotiated an excellent deal.',
    propertyType: 'Penthouse',
    date: '2024-01-18'
  },
  {
    id: 'testimonial-3',
    client: {
      name: 'Robert & Maria Santos',
      location: 'International Buyers'
    },
    rating: 5,
    comment: 'As international buyers, we needed someone who understood our unique requirements. The team exceeded our expectations in every way.',
    propertyType: 'Waterfront Villa',
    date: '2024-01-05'
  }
];