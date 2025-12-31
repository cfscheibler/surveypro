# Deployment Guide

This guide covers deploying the G2M Survey Platform to Vercel (frontend) and Railway (backend/database).

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Railway account (free tier available)
- Node.js 18+ installed locally

## Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel Dashboard

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Configure Build Settings** (if needed)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Environment Variables (if needed later)
- Add any environment variables in Vercel dashboard
- Settings → Environment Variables

## Backend/Database Deployment (Railway)

### For Future Backend Implementation

1. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo" or "Empty Project"

2. **Add PostgreSQL Database**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will provide connection string

3. **Deploy Backend Service** (when ready)
   - Add new service
   - Connect GitHub repo
   - Configure build settings
   - Add environment variables:
     - `DATABASE_URL` (from Railway PostgreSQL)
     - `JWT_SECRET`
     - Other required variables

## Current Setup (Frontend Only)

Currently, the application is frontend-only and can be fully deployed on Vercel. The surveys are stored in the codebase as TypeScript files.

### Survey URLs

Once deployed, surveys will be accessible at:
- Home: `https://your-domain.vercel.app/`
- SDR Survey: `https://your-domain.vercel.app/survey/panaya-sdr-survey`
- Marketing Ops Survey: `https://your-domain.vercel.app/survey/panaya-marketing-ops-survey`

## Adding New Surveys

1. Create a new survey file in `src/data/surveys/`
2. Export the survey object
3. Add it to `src/data/surveys/index.ts` registry
4. Deploy to Vercel

Example:
```typescript
// src/data/surveys/myNewSurvey.ts
import type { Survey } from '../../types/survey';

export const myNewSurvey: Survey = {
  id: 'my-survey-id',
  title: 'My Survey Title',
  description: 'Survey description',
  sections: [/* ... */]
};

// Then add to index.ts:
import { myNewSurvey } from './myNewSurvey';
export const surveys: Record<string, Survey> = {
  // ... existing surveys
  'my-survey-id': myNewSurvey,
};
```

## Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## Troubleshooting

### Build Fails on Vercel
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Routing Issues
- Ensure `vercel.json` has the rewrite rule for SPA routing
- Check that all routes are properly configured in React Router

### Survey Not Found
- Verify survey ID matches the route parameter
- Check that survey is registered in `src/data/surveys/index.ts`

## Next Steps

When ready to add backend:
1. Set up Railway PostgreSQL database
2. Create backend API (Node.js/Express recommended)
3. Update frontend to fetch surveys from API
4. Add response storage in database
5. Configure CORS and environment variables

