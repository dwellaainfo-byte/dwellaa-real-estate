import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'propertyImage',
  title: 'Property Image',
  type: 'object',
  icon: () => '📸',
  fields: [
    defineField({
      name: 'asset',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
      description: 'Describe the image for accessibility and SEO',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (Rule) => Rule.max(200),
      description: 'Optional caption to display with the image',
    }),
    defineField({
      name: 'category',
      title: 'Image Category',
      type: 'string',
      options: {
        list: [
          { title: 'Exterior', value: 'exterior' },
          { title: 'Interior', value: 'interior' },
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Bedroom', value: 'bedroom' },
          { title: 'Bathroom', value: 'bathroom' },
          { title: 'Living Room', value: 'living-room' },
          { title: 'Dining Room', value: 'dining-room' },
          { title: 'Pool/Spa', value: 'pool-spa' },
          { title: 'Garden/Landscaping', value: 'garden' },
          { title: 'Views', value: 'views' },
          { title: 'Amenities', value: 'amenities' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'exterior',
    }),
    defineField({
      name: 'room',
      title: 'Room/Space Name',
      type: 'string',
      description: 'Specific room or space name (e.g., "Master Bedroom", "Chef\'s Kitchen")',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
      description: 'Order in which this image should appear (0 = first)',
    }),
    defineField({
      name: 'isMainImage',
      title: 'Main Property Image',
      type: 'boolean',
      initialValue: false,
      description: 'Use this as the primary image for the property',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured in Gallery',
      type: 'boolean',
      initialValue: true,
      description: 'Include this image in the main property gallery',
    }),
    defineField({
      name: 'showInListing',
      title: 'Show in Property Listings',
      type: 'boolean',
      initialValue: true,
      description: 'Display this image in property search results',
    }),
    defineField({
      name: 'photographer',
      title: 'Photographer',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Photographer Name',
          type: 'string',
        }),
        defineField({
          name: 'website',
          title: 'Website',
          type: 'url',
        }),
        defineField({
          name: 'creditRequired',
          title: 'Credit Required',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'technicalData',
      title: 'Technical Data',
      type: 'object',
      fields: [
        defineField({
          name: 'dateTaken',
          title: 'Date Taken',
          type: 'datetime',
        }),
        defineField({
          name: 'camera',
          title: 'Camera Used',
          type: 'string',
        }),
        defineField({
          name: 'settings',
          title: 'Camera Settings',
          type: 'string',
          description: 'F-stop, shutter speed, ISO, etc.',
        }),
        defineField({
          name: 'postProcessing',
          title: 'Post-Processing Notes',
          type: 'text',
          rows: 2,
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'quality',
      title: 'Image Quality',
      type: 'string',
      options: {
        list: [
          { title: 'Professional', value: 'professional' },
          { title: 'High Quality', value: 'high' },
          { title: 'Standard', value: 'standard' },
          { title: 'Needs Replacement', value: 'low' },
        ],
      },
      initialValue: 'professional',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tags to help organize and search images',
    }),
  ],
  preview: {
    select: {
      media: 'asset',
      category: 'category',
      room: 'room',
      alt: 'alt',
      isMain: 'isMainImage',
      order: 'order',
    },
    prepare({ media, category, room, alt, isMain, order }) {
      const title = room || category || 'Property Image'
      const badges = []
      if (isMain) badges.push('🌟 Main')
      
      return {
        title: `${title} ${badges.join(' ')}`,
        subtitle: `Order: ${order || 0} • ${alt}`,
        media,
      }
    },
  },
})