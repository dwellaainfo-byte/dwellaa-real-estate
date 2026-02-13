import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'client',
      title: 'Client Information',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Client Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Client Photo',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'location',
          title: 'Client Location',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'occupation',
          title: 'Occupation (Optional)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '1 Star', value: 1 },
          { title: '2 Stars', value: 2 },
          { title: '3 Stars', value: 3 },
          { title: '4 Stars', value: 4 },
          { title: '5 Stars', value: 5 },
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'comment',
      title: 'Testimonial Comment',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(500),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type Involved',
      type: 'string',
      options: {
        list: [
          { title: 'Luxury Estate', value: 'luxury-estate' },
          { title: 'Penthouse', value: 'penthouse' },
          { title: 'Waterfront Villa', value: 'waterfront-villa' },
          { title: 'City Apartment', value: 'city-apartment' },
          { title: 'Country House', value: 'country-house' },
          { title: 'Investment Property', value: 'investment-property' },
          { title: 'Commercial Property', value: 'commercial-property' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'agent',
      title: 'Related Agent',
      type: 'reference',
      to: [{ type: 'agent' }],
    }),
    defineField({
      name: 'property',
      title: 'Related Property',
      type: 'reference',
      to: [{ type: 'property' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'verified',
      title: 'Verified Testimonial',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as verified if this is a genuine client testimonial',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft', value: 'draft' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'dateOfService',
      title: 'Date of Service',
      type: 'date',
      description: 'When did we provide service to this client?',
    }),
    defineField({
      name: 'serviceType',
      title: 'Type of Service',
      type: 'string',
      options: {
        list: [
          { title: 'Property Purchase', value: 'purchase' },
          { title: 'Property Sale', value: 'sale' },
          { title: 'Rental', value: 'rental' },
          { title: 'Investment Advisory', value: 'investment' },
          { title: 'Property Management', value: 'management' },
          { title: 'Consultation', value: 'consultation' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      clientName: 'client.name',
      rating: 'rating',
      propertyType: 'propertyType',
      comment: 'comment',
      image: 'client.image',
      featured: 'featured',
      verified: 'verified',
    },
    prepare({ clientName, rating, propertyType, comment, image, featured, verified }) {
      const stars = '⭐'.repeat(rating || 0)
      const badges = []
      if (featured) badges.push('📌')
      if (verified) badges.push('✅')
      
      return {
        title: `${clientName} ${badges.join(' ')}`,
        subtitle: `${stars} • ${propertyType} • ${comment?.substring(0, 50)}...`,
        media: image,
      }
    },
  },
  orderings: [
    {
      title: 'Rating (Highest First)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Date Created',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
})