import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'

// Import schemas
import property from './schemas/property'
import agent from './schemas/agent'
import testimonial from './schemas/testimonial'
import location from './schemas/location'
import propertyImage from './schemas/propertyImage'

export default defineConfig({
  name: 'default',
  title: 'Luxury Real Estate CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Properties')
              .child(
                S.documentTypeList('property').title('All Properties')
              ),
            S.listItem()
              .title('Agents')
              .child(
                S.documentTypeList('agent').title('All Agents')
              ),
            S.listItem()
              .title('Testimonials')
              .child(
                S.documentTypeList('testimonial').title('All Testimonials')
              ),
            S.listItem()
              .title('Locations')
              .child(
                S.documentTypeList('location').title('All Locations')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['property', 'agent', 'testimonial', 'location'].includes(
                  listItem.getId() || ''
                )
            ),
          ]),
    }),
    visionTool(),
    colorInput(),
    imageHotspotArrayPlugin(),
  ],
  schema: {
    types: [
      property,
      agent,
      testimonial,
      location,
      propertyImage,
    ],
  },
})