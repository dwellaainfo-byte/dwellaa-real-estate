# Deployment Guide

## Quick Deployment on Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/luxury-real-estate.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
     NEXT_PUBLIC_SANITY_DATASET=production
     SANITY_API_TOKEN=your-token
     ```
   - Click "Deploy"

3. **Set up Sanity CMS**
   ```bash
   # Install Sanity CLI
   npm install -g @sanity/cli
   
   # Login to Sanity
   sanity login
   
   # Initialize Sanity project
   sanity init --project-id your-project-id --dataset production
   
   # Deploy Sanity Studio
   sanity deploy
   ```

## Manual Deployment

### Build and Export
```bash
npm run build
npm run export  # If using static export
```

### Deploy to other platforms:
- **Netlify**: Connect GitHub repo, set build command to `npm run build`
- **AWS Amplify**: Use the Amplify console or CLI
- **Railway**: Connect GitHub and deploy
- **DigitalOcean App Platform**: Use their dashboard

## Environment Variables

Required for production:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

Optional:
- `NEXT_PUBLIC_GA_TRACKING_ID`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## Post-Deployment Checklist

- [ ] Sanity Studio is accessible at your-site.com/studio
- [ ] Property data is loading correctly
- [ ] Images are displaying properly
- [ ] Contact forms are working
- [ ] SEO metadata is correct
- [ ] Analytics tracking is setup (if configured)
- [ ] Mobile responsiveness is tested
- [ ] Performance scores are acceptable

## Troubleshooting

**Build fails**: Check TypeScript errors and dependencies
**Images not loading**: Verify Sanity configuration and CDN settings
**API errors**: Check environment variables and Sanity tokens
**Styling issues**: Verify Tailwind CSS build process