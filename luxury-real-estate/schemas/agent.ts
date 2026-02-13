import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'agent',
  title: 'Agent',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
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
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      initialValue: 'Luxury Properties International',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'performance',
      title: 'Performance Metrics',
      type: 'object',
      fields: [
        defineField({
          name: 'propertiesSold',
          title: 'Properties Sold',
          type: 'number',
          initialValue: 0,
        }),
        defineField({
          name: 'averageDaysOnMarket',
          title: 'Average Days on Market',
          type: 'number',
          initialValue: 30,
        }),
        defineField({
          name: 'customerSatisfaction',
          title: 'Customer Satisfaction (1-5)',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(5),
          initialValue: 5,
        }),
      ],
    }),
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'officeLocation',
      title: 'Primary Office Location',
      type: 'string',
      options: {
        list: [
          { title: 'Beverly Hills', value: 'beverly-hills' },
          { title: 'Manhattan', value: 'manhattan' },
          { title: 'Miami Beach', value: 'miami-beach' },
          { title: 'Aspen', value: 'aspen' },
          { title: 'Hamptons', value: 'hamptons' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      experience: 'experience',
      company: 'company',
      image: 'image',
      propertiesSold: 'performance.propertiesSold',
    },
    prepare({ title, experience, company, image, propertiesSold }) {
      return {
        title,
        subtitle: `${experience} years • ${propertiesSold || 0} properties sold • ${company}`,
        media: image,
      }
    },
  },
})