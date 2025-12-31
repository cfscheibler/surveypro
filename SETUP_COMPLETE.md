# Setup Complete! 🎉

Your survey platform is now ready to store and retrieve survey responses.

## What's Been Set Up

### ✅ Backend API (Railway)
- **Location**: `backend/` folder
- **Database**: PostgreSQL (will be set up on Railway)
- **API Endpoints**: 
  - Submit responses
  - Get all responses for a survey
  - Get detailed response
  - Export responses as CSV

### ✅ Frontend Integration
- **API Service**: `src/services/api.ts`
- **Updated Survey Submission**: Now sends data to backend
- **Error Handling**: Shows errors if submission fails
- **Loading States**: Shows "Submitting..." during submission

### ✅ Database Schema
- `survey_responses` table - stores each submission
- `survey_response_answers` table - stores individual answers
- Auto-initialized on first backend startup

## How Survey Results Are Stored

### When a User Submits a Survey:

1. **Frontend** sends data to backend API
2. **Backend** receives and validates the data
3. **Database** stores:
   - Response record (survey ID, timestamp, IP, user agent)
   - All question answers (linked to response)

### Where Results Are Saved:

- **Database**: PostgreSQL on Railway
- **Tables**: 
  - `survey_responses` - One row per submission
  - `survey_response_answers` - One row per question answer

## How to Access Results

### Option 1: Via API (Recommended)

```bash
# Get all responses for SDR survey
curl https://your-backend.railway.app/api/responses/survey/panaya-sdr-survey

# Export as CSV
curl https://your-backend.railway.app/api/responses/export/panaya-sdr-survey -o results.csv
```

### Option 2: Direct Database Access

1. Go to Railway dashboard
2. Click on your PostgreSQL database
3. Use the query interface to run SQL:
   ```sql
   SELECT * FROM survey_responses 
   WHERE survey_id = 'panaya-sdr-survey';
   ```

### Option 3: Build a Results Dashboard (Future)

The API is ready - you can build a simple admin page to view results.

## Next Steps to Deploy

### 1. Deploy Backend to Railway

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Add backend API for survey responses"
   git push origin main
   ```

2. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository: `https://github.com/cfscheibler/surveypro.git`
   - **Important**: Set root directory to `backend`

3. **Add PostgreSQL Database**
   - In Railway project, click "New"
   - Select "Database" → "Add PostgreSQL"
   - Railway automatically provides `DATABASE_URL`

4. **Set Environment Variables**
   - In your backend service on Railway:
     - `FRONTEND_URL`: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
     - `DATABASE_URL`: Auto-provided by Railway (don't change)
     - `PORT`: Auto-set by Railway

5. **Deploy**
   - Railway auto-deploys on git push
   - Check logs to ensure database initialized

### 2. Update Frontend

1. **Get Backend URL from Railway**
   - Copy your Railway service URL (e.g., `https://your-backend.railway.app`)

2. **Add to Vercel Environment Variables**
   - Go to Vercel project settings
   - Add variable:
     - Key: `VITE_API_URL`
     - Value: Your Railway backend URL
   - Redeploy frontend

3. **Or Update Locally**
   Create `.env.local` in project root:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

### 3. Test Everything

1. **Test Survey Submission**
   - Visit your survey
   - Fill it out and submit
   - Should see "Thank You" page

2. **Check Results**
   - Use API endpoint or Railway database
   - Verify data is stored correctly

## Survey IDs

- **SDR Survey**: `panaya-sdr-survey`
- **Marketing Ops Survey**: `panaya-marketing-ops-survey`

## API Endpoints Reference

**Base URL**: `https://your-backend.railway.app`

- `POST /api/responses/submit` - Submit survey response
- `GET /api/responses/survey/:surveyId` - Get all responses
- `GET /api/responses/response/:responseId` - Get single response
- `GET /api/responses/export/:surveyId` - Export CSV
- `GET /health` - Health check

## Files Created

### Backend
- `backend/src/index.ts` - Main server
- `backend/src/routes/responses.ts` - API routes
- `backend/src/db/connection.ts` - Database connection
- `backend/src/db/schema.sql` - Database schema
- `backend/package.json` - Dependencies
- `backend/railway.json` - Railway config

### Frontend
- `src/services/api.ts` - API service
- Updated `src/pages/SurveyPage.tsx` - Sends to API
- Updated `src/components/SurveyForm.tsx` - Loading states

### Documentation
- `RESULTS_GUIDE.md` - How to access results
- `backend/README.md` - Backend setup guide

## Testing Locally

### Start Backend
```bash
cd backend
npm install
# Create .env with DATABASE_URL
npm run dev
```

### Start Frontend
```bash
# In project root
npm run dev
# Create .env.local with VITE_API_URL=http://localhost:3001
```

## Troubleshooting

### Backend won't start
- Check `DATABASE_URL` is set
- Verify PostgreSQL is running (if local)
- Check Railway logs

### Responses not saving
- Verify backend is deployed
- Check `VITE_API_URL` in frontend
- Check browser console for errors
- Check Railway logs

### Can't access results
- Verify database has data
- Check survey ID matches exactly
- Use Railway database viewer

## Security Notes

⚠️ **Current Setup**: API is public (no authentication)

For production, consider:
- API key authentication
- Rate limiting
- User authentication for viewing results
- HTTPS only

## Support

See detailed guides:
- `RESULTS_GUIDE.md` - How to access results
- `DEPLOYMENT.md` - Deployment instructions
- `backend/README.md` - Backend documentation

---

**You're all set!** Once deployed, survey responses will be automatically saved to your Railway database. 🚀

