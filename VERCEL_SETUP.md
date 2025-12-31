# Vercel Setup Guide

This guide walks you through connecting your Vercel frontend to your Railway backend.

## Step 1: Get Your Railway Backend URL

1. Go to [railway.app](https://railway.app)
2. Open your project
3. Click on your backend service
4. Go to the "Settings" tab
5. Find "Domains" or "Public URL"
6. Copy the URL (e.g., `https://your-backend-production.up.railway.app`)

**Important**: Make sure your backend is deployed and running!

## Step 2: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose `cfscheibler/surveypro`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

4. **Add Environment Variable**
   - Before deploying, click "Environment Variables"
   - Add new variable:
     - **Key**: `VITE_API_URL`
     - **Value**: Your Railway backend URL (from Step 1)
     - **Environment**: Production, Preview, Development (check all)
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Set Environment Variable**
   ```bash
   vercel env add VITE_API_URL
   # Enter your Railway backend URL when prompted
   # Select: Production, Preview, Development
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 3: Verify Connection

1. **Check Frontend**
   - Visit your Vercel URL
   - Open browser DevTools (F12)
   - Go to Console tab
   - Submit a test survey
   - Check for any API errors

2. **Check Backend**
   - Visit `https://your-railway-backend.railway.app/health`
   - Should see: `{"status":"ok","timestamp":"..."}`

3. **Test Survey Submission**
   - Fill out a survey on your Vercel site
   - Submit it
   - Check Railway database or use API to verify response was saved

## Step 4: Update Railway CORS (If Needed)

If you get CORS errors, update Railway backend:

1. Go to Railway backend service
2. Add/Update environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel URL (e.g., `https://your-project.vercel.app`)
3. Redeploy backend

The backend already has CORS configured to use `FRONTEND_URL`.

## Troubleshooting

### CORS Errors
- **Symptom**: Browser console shows CORS errors
- **Fix**: 
  1. Set `FRONTEND_URL` in Railway to your Vercel URL
  2. Redeploy Railway backend
  3. Clear browser cache

### API Not Found (404)
- **Symptom**: Network tab shows 404 for API calls
- **Fix**: 
  1. Verify `VITE_API_URL` is set correctly in Vercel
  2. Check Railway backend is running
  3. Verify backend URL is correct

### Connection Refused
- **Symptom**: Can't connect to backend
- **Fix**:
  1. Check Railway backend is deployed and running
  2. Check Railway logs for errors
  3. Verify `DATABASE_URL` is set in Railway

### Environment Variable Not Working
- **Symptom**: Frontend still uses localhost API
- **Fix**:
  1. Vercel environment variables require redeploy
  2. After adding `VITE_API_URL`, trigger a new deployment
  3. Vite env vars must start with `VITE_`

## Quick Checklist

- [ ] Railway backend deployed and running
- [ ] Railway backend URL copied
- [ ] Vercel project created and connected to GitHub
- [ ] `VITE_API_URL` environment variable set in Vercel
- [ ] `FRONTEND_URL` environment variable set in Railway
- [ ] Frontend deployed to Vercel
- [ ] Tested survey submission
- [ ] Verified responses are saved in Railway database

## Environment Variables Summary

### Vercel (Frontend)
- `VITE_API_URL` = Your Railway backend URL

### Railway (Backend)
- `DATABASE_URL` = Auto-provided by Railway PostgreSQL
- `FRONTEND_URL` = Your Vercel frontend URL
- `PORT` = Auto-set by Railway

## Next Steps

Once everything is connected:
1. Test both surveys
2. Check results in Railway database
3. Export responses via API
4. Add SDR survey questions when ready

## Need Help?

- Check Vercel deployment logs
- Check Railway backend logs
- Verify environment variables are set correctly
- Test API endpoints directly (curl or Postman)

