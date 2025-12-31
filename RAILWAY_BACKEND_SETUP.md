# Railway Backend Setup - Important!

## Issue: Railway is Building Frontend Instead of Backend

From the build logs, Railway is detecting your project as a Vite frontend and trying to build it as a static site. You need to configure Railway to build the **backend** folder instead.

## Solution: Set Root Directory in Railway

### Step 1: Configure Railway Service

1. **Go to Railway Dashboard**
   - Open your `surveypro` service
   - Click on **"Settings"** tab

2. **Set Root Directory**
   - Find **"Root Directory"** or **"Source"** setting
   - Set it to: `backend`
   - Save changes

3. **Add PostgreSQL Database**
   - In your Railway project, click **"New"**
   - Select **"Database"** → **"Add PostgreSQL"**
   - Railway will automatically provide `DATABASE_URL`

4. **Set Environment Variables**
   - Go to **"Variables"** tab
   - Add these variables:
     - `DATABASE_URL` - Auto-provided by Railway (don't change)
     - `FRONTEND_URL` - Your Vercel URL (e.g., `https://your-project.vercel.app`)
     - `PORT` - Railway sets this automatically (don't change)

5. **Redeploy**
   - Railway should auto-redeploy after setting root directory
   - Or manually trigger a new deployment

## Alternative: Create Separate Services

If Railway doesn't have a root directory setting, create two separate services:

### Service 1: Backend
- **Name**: `surveypro-backend`
- **Root Directory**: `backend` (if option available)
- **Or**: Create a new service and point it to the `backend` folder

### Service 2: Frontend (Optional - use Vercel instead)
- Deploy frontend to Vercel (recommended)
- Backend stays on Railway

## Verify Backend is Running

After redeploying with correct root directory:

1. **Check Build Logs**
   - Should see: `npm install` in `backend/` folder
   - Should see: `npm run build` (TypeScript compilation)
   - Should see: `npm start` (server starting)

2. **Check Health Endpoint**
   - Visit: `https://your-railway-backend.railway.app/health`
   - Should see: `{"status":"ok","timestamp":"..."}`

3. **Check Logs**
   - Should see: `✅ Connected to PostgreSQL database`
   - Should see: `✅ Database tables initialized`
   - Should see: `🚀 Server running on port XXXX`

## Current Status

✅ TypeScript errors fixed  
⚠️ Need to configure Railway root directory to `backend`  
⚠️ Need to add PostgreSQL database  
⚠️ Need to set environment variables  

## Next Steps

1. Fix Railway root directory → `backend`
2. Add PostgreSQL database
3. Set environment variables
4. Redeploy
5. Test backend health endpoint
6. Connect Vercel frontend to Railway backend

