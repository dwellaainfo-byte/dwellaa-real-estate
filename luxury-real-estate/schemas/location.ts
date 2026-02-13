import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: () => '📍',
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Location Type',
      type: 'string',
      options: {
        list: [
          { title: 'City', value: 'city' },
          { title: 'Neighborhood', value: 'neighborhood' },
          { title: 'Region', value: 'region' },
          { title: 'Country', value: 'country' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State/Province',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'marketData',
      title: 'Market Data',
      type: 'object',
      fields: [
        defineField({
          name: 'averagePrice',
          title: 'Average Property Price',
          type: 'number',
        }),
        defineField({
          name: 'priceChange',
          title: 'Price Change (%)',
          type: 'number',
          description: 'Year-over-year percentage change',
        }),
        defineField({
          name: 'daysOnMarket',
          title: 'Average Days on Market',
          type: 'number',
        }),
        defineField({
          name: 'propertiesSold',
          title: 'Properties Sold (Last 12 Months)',
          type: 'number',
        }),
        defineField({
          name: 'priceRange',
          title: 'Price Range',
          type: 'object',
          fields: [
            defineField({
              name: 'min',
              title: 'Minimum Price',
              type: 'number',
            }),
            defineField({
              name: 'max',
              title: 'Maximum Price',
              type: 'number',
            }),
          ],
        }),
        defineField({
          name: 'lastUpdated',
          title: 'Data Last Updated',
          type: 'datetime',
        }),
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Area Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Location',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Inactive', value: 'inactive' },
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
      country: 'country',
      state: 'state',
      image: 'featuredImage',
      featured: 'featured',
      averagePrice: 'marketData.averagePrice',
    },
    prepare({ title, type, country, state, image, featured, averagePrice }) {
      const location = [state, country].filter(Boolean).join(', ')
      const priceInfo = averagePrice 
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(averagePrice)
        : ''
      
      return {
        title: `${title} ${featured ? '⭐' : ''}`,
        subtitle: `${type} • ${location} ${priceInfo ? `• Avg: ${priceInfo}` : ''}`,
        media: image,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Average Price (Highest)',
      name: 'priceDesc',
      by: [{ field: 'marketData.averagePrice', direction: 'desc' }],
    },
  ],
})