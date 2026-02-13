# Production Setup Steps

## 1. Sanity CMS Setup
```bash
# Login to Sanity (will open browser)
sanity login

# Create new project 
sanity projects create

# Initialize in current directory
sanity dataset create production
```

## 2. Update Environment Variables
```bash
# Edit .env.local with real Sanity project ID and token
NEXT_PUBLIC_SANITY_PROJECT_ID=your-real-project-id
NEXT_PUBLIC_SANITY_DATASET=production  
SANITY_API_TOKEN=your-real-api-token
```

## 3. Deploy Sanity Studio
```bash
sanity deploy
```

## 4. Deploy to Vercel
- Push to GitHub
- Import in Vercel
- Add custom domain
- Add environment variables in Vercel dashboard

## 5. Test Everything
- Visit your-domain.com
- Test Sanity Studio at your-domain.com/studio
- Add test property in CMS