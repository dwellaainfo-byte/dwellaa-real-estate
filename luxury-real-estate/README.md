# Luxury Real Estate Website

A modern, responsive luxury real estate website built with Next.js 14, Tailwind CSS, and Sanity.io headless CMS. Inspired by premium real estate platforms like Sotheby's Realty and Maisons et Appartements.

## ✨ Features

### 🏠 Property Listings
- Comprehensive property search and filtering
- Advanced search with price range, location, property type, bedrooms, bathrooms
- Interactive photo galleries with fullscreen view
- Virtual tour integration
- Property detail pages with rich information
- Mortgage calculator
- Agent information and contact forms

### 📱 Responsive Design
- Mobile-first approach
- Responsive across all devices
- Touch-friendly interactions
- Optimized images with Next.js Image component

### 🎨 Premium UI/UX
- Luxury design inspired by high-end real estate brands
- Smooth animations and transitions
- Professional color scheme with gold accents
- Custom typography with serif headings
- Clean, minimalist layout

### 📊 Content Management
- Sanity.io headless CMS integration
- Easy property management for non-technical users
- Rich content editing capabilities
- Image management and optimization
- SEO-friendly content structure

### 🔍 SEO Optimized
- Server-side rendering with Next.js 14
- Optimized meta tags and structured data
- Clean URLs and proper heading structure
- Fast loading times and performance optimization

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom luxury theme
- **CMS**: Sanity.io for content management
- **UI Components**: Custom components with Headless UI
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Image Carousel**: Embla Carousel
- **TypeScript**: Full type safety
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity.io account (free tier available)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luxury-real-estate.git
   cd luxury-real-estate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-api-token
   ```

4. **Set up Sanity CMS**
   ```bash
   # Install Sanity CLI globally
   npm install -g @sanity/cli
   
   # Login to Sanity
   sanity login
   
   # Create a new Sanity project (or use existing)
   sanity init
   
   # Deploy the Sanity Studio
   sanity deploy
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
luxury-real-estate/
├── public/
│   └── images/          # Static images
├── src/
│   ├── app/            # Next.js 14 app directory
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   ├── page.tsx    # Home page
│   │   ├── properties/ # Property pages
│   │   └── contact/    # Contact page
│   ├── components/     # Reusable components
│   │   ├── ui/         # Basic UI components
│   │   ├── layout/     # Layout components
│   │   ├── property/   # Property-specific components
│   │   ├── search/     # Search components
│   │   └── forms/      # Form components
│   ├── lib/           # Utilities and configurations
│   ├── types/         # TypeScript type definitions
│   └── data/          # Sample data for development
├── schemas/           # Sanity CMS schemas
├── sanity.config.ts   # Sanity configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## 🎨 Customization

### Colors and Branding
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    // Your primary color palette
  },
  luxury: {
    gold: '#d4af37',
    darkGold: '#b8941f',
    cream: '#faf8f5',
    charcoal: '#2d2d2d',
  }
}
```

### Typography
The project uses Google Fonts (Inter + Playfair Display). Update in `src/app/layout.tsx`:

```typescript
const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })
```

### Content Management
Access your Sanity Studio at: `https://your-project.sanity.studio/`

Add properties, agents, testimonials, and manage all content through the intuitive interface.

## 📊 Content Structure

### Properties
- Title, description, price, currency
- Location details with coordinates
- Property details (bedrooms, bathrooms, area, type)
- Image galleries with captions
- Features and amenities
- Virtual tour links
- Floor plans
- SEO metadata

### Agents
- Profile information and photo
- Contact details
- Specialties and experience
- Performance metrics
- Social media links
- Office locations

### Testimonials
- Client information and photos
- Ratings and comments
- Property types and service types
- Verification status

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📈 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Components and images load as needed
- **Caching**: Proper caching headers for static assets
- **Bundle Analysis**: Analyze bundle size with `npm run analyze`

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Adding New Components
1. Create component in appropriate directory under `src/components/`
2. Export from index file if needed
3. Add proper TypeScript types
4. Include in Storybook if complex

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For questions and support:
- Create an issue on GitHub
- Contact: [your-email@example.com]
- Documentation: [Link to docs if available]

## 🙏 Acknowledgments

- Inspired by [Sotheby's International Realty](https://www.sothebysrealty.com)
- Inspired by [Maisons et Appartements](https://www.maisonsetappartements.fr)
- Built with love using Next.js and Sanity.io
- Icons by [Lucide](https://lucide.dev)
- Images from [Unsplash](https://unsplash.com)

---

**Made with ❤️ for the luxury real estate industry**# Build trigger
# Force Next.js build
