import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Property, Agent, Testimonial } from '@/types';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ queries for fetching data
export const queries = {
  // Get all properties with filters
  properties: `*[_type == "property" && status == "active"] | order(_createdAt desc) {
    _id,
    title,
    description,
    price,
    currency,
    location,
    details,
    images[] {
      _key,
      asset->,
      alt,
      caption,
      order,
      isMainImage
    },
    features,
    amenities,
    status,
    listingAgent-> {
      name,
      email,
      phone,
      image {
        asset->
      },
      company
    },
    _createdAt,
    _updatedAt,
    featured,
    virtualTour,
    floorPlan {
      asset->
    }
  }`,

  // Get single property by ID
  propertyById: `*[_type == "property" && _id == $id][0] {
    _id,
    title,
    description,
    price,
    currency,
    location,
    details,
    images[] {
      _key,
      asset->,
      alt,
      caption,
      order,
      isMainImage
    },
    features,
    amenities,
    status,
    listingAgent-> {
      name,
      email,
      phone,
      image {
        asset->
      },
      company,
      bio,
      specialties,
      experience
    },
    _createdAt,
    _updatedAt,
    featured,
    virtualTour,
    floorPlan {
      asset->
    }
  }`,

  // Get featured properties
  featuredProperties: `*[_type == "property" && featured == true && status == "active"] | order(_createdAt desc) [0...6] {
    _id,
    title,
    price,
    currency,
    location,
    details,
    images[isMainImage == true][0] {
      asset->,
      alt
    },
    status,
    featured
  }`,

  // Get agents
  agents: `*[_type == "agent"] | order(name asc) {
    _id,
    name,
    email,
    phone,
    image {
      asset->
    },
    bio,
    specialties,
    experience,
    certifications,
    socialMedia,
    performance
  }`,

  // Get testimonials
  testimonials: `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    client,
    rating,
    comment,
    propertyType,
    _createdAt
  }`,

  // Search properties
  searchProperties: `*[_type == "property" && status == "active" 
    && (title match $searchTerm + "*" || location.city match $searchTerm + "*" || location.address match $searchTerm + "*")] 
    | order(_createdAt desc) {
    _id,
    title,
    description,
    price,
    currency,
    location,
    details,
    images[isMainImage == true][0] {
      asset->,
      alt
    },
    status,
    featured
  }`,
};

// Helper functions for Sanity operations
export async function getProperties(filters?: any): Promise<Property[]> {
  try {
    let query = queries.properties;
    let params = {};

    // Add filters if provided
    if (filters) {
      const conditions = [];
      
      if (filters.minPrice) conditions.push(`price >= ${filters.minPrice}`);
      if (filters.maxPrice) conditions.push(`price <= ${filters.maxPrice}`);
      if (filters.propertyType) conditions.push(`details.propertyType == "${filters.propertyType}"`);
      if (filters.bedrooms) conditions.push(`details.bedrooms >= ${filters.bedrooms}`);
      if (filters.location) conditions.push(`location.city match "${filters.location}*"`);
      
      if (conditions.length > 0) {
        query = query.replace('status == "active"', `status == "active" && ${conditions.join(' && ')}`);
      }
    }

    const properties = await client.fetch(query, params);
    return properties.map(transformSanityProperty);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const property = await client.fetch(queries.propertyById, { id });
    return property ? transformSanityProperty(property) : null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  try {
    const properties = await client.fetch(queries.featuredProperties);
    return properties.map(transformSanityProperty);
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
}

export async function searchProperties(searchTerm: string): Promise<Property[]> {
  try {
    const properties = await client.fetch(queries.searchProperties, { searchTerm });
    return properties.map(transformSanityProperty);
  } catch (error) {
    console.error('Error searching properties:', error);
    return [];
  }
}

// Transform Sanity data to our Property type
function transformSanityProperty(sanityProperty: any): Property {
  return {
    id: sanityProperty._id,
    title: sanityProperty.title,
    description: sanityProperty.description,
    price: sanityProperty.price,
    currency: sanityProperty.currency || 'USD',
    location: sanityProperty.location,
    details: sanityProperty.details,
    images: sanityProperty.images?.map((img: any, index: number) => ({
      id: img._key || index.toString(),
      url: urlFor(img.asset).width(1200).height(800).url(),
      alt: img.alt || sanityProperty.title,
      caption: img.caption,
      order: img.order || index,
      isMainImage: img.isMainImage || index === 0,
    })) || [],
    features: sanityProperty.features || [],
    amenities: sanityProperty.amenities || [],
    status: sanityProperty.status,
    listingAgent: sanityProperty.listingAgent ? {
      name: sanityProperty.listingAgent.name,
      email: sanityProperty.listingAgent.email,
      phone: sanityProperty.listingAgent.phone,
      image: sanityProperty.listingAgent.image ? urlFor(sanityProperty.listingAgent.image).width(200).height(200).url() : undefined,
      company: sanityProperty.listingAgent.company,
    } : {
      name: 'Luxury Properties Team',
      email: 'info@luxuryproperties.com',
      phone: '+1 (555) 123-4567',
      company: 'Luxury Properties International',
    },
    createdAt: sanityProperty._createdAt,
    updatedAt: sanityProperty._updatedAt,
    featured: sanityProperty.featured || false,
    virtualTour: sanityProperty.virtualTour,
    floorPlan: sanityProperty.floorPlan ? urlFor(sanityProperty.floorPlan).url() : undefined,
  };
}