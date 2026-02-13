import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(50).max(1000),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
          { title: 'GBP', value: 'GBP' },
          { title: 'JPY', value: 'JPY' },
          { title: 'CAD', value: 'CAD' },
          { title: 'AUD', value: 'AUD' },
        ],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'state',
          title: 'State/Province',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'zipCode',
          title: 'ZIP/Postal Code',
          type: 'string',
        }),
        defineField({
          name: 'coordinates',
          title: 'Coordinates',
          type: 'geopoint',
        }),
      ],
    }),
    defineField({
      name: 'details',
      title: 'Property Details',
      type: 'object',
      fields: [
        defineField({
          name: 'bedrooms',
          title: 'Bedrooms',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: 'bathrooms',
          title: 'Bathrooms',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: 'area',
          title: 'Living Area',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: 'areaUnit',
          title: 'Area Unit',
          type: 'string',
          options: {
            list: [
              { title: 'Square Feet', value: 'sqft' },
              { title: 'Square Meters', value: 'sqm' },
            ],
          },
          initialValue: 'sqft',
        }),
        defineField({
          name: 'lotSize',
          title: 'Lot Size (acres)',
          type: 'number',
        }),
        defineField({
          name: 'yearBuilt',
          title: 'Year Built',
          type: 'number',
        }),
        defineField({
          name: 'propertyType',
          title: 'Property Type',
          type: 'string',
          options: {
            list: [
              { title: 'House', value: 'house' },
              { title: 'Apartment', value: 'apartment' },
              { title: 'Villa', value: 'villa' },
              { title: 'Penthouse', value: 'penthouse' },
              { title: 'Estate', value: 'estate' },
              { title: 'Condo', value: 'condo' },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Property Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'asset',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
            }),
            defineField({
              name: 'isMainImage',
              title: 'Main Image',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Sold', value: 'sold' },
          { title: 'Pending', value: 'pending' },
          { title: 'Off Market', value: 'off-market' },
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'listingAgent',
      title: 'Listing Agent',
      type: 'reference',
      to: [{ type: 'agent' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'virtualTour',
      title: 'Virtual Tour URL',
      type: 'url',
    }),
    defineField({
      name: 'floorPlan',
      title: 'Floor Plan',
      type: 'image',
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      currency: 'currency',
      city: 'location.city',
      image: 'images.0.asset',
      featured: 'featured',
    },
    prepare({ title, price, currency, city, image, featured }) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      
      return {
        title: `${title} ${featured ? '⭐' : ''}`,
        subtitle: `${formatter.format(price)} • ${city}`,
        media: image,
      }
    },
  },
})