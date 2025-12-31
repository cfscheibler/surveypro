# How to Access Survey Results

## Overview

Survey responses are stored in a PostgreSQL database on Railway. This guide explains how to access and view your survey results.

## Where Results Are Stored

### Database Location
- **Platform**: Railway (PostgreSQL database)
- **Tables**:
  - `survey_responses` - Main response records
  - `survey_response_answers` - Individual question answers

### Data Stored
For each survey submission:
- Survey ID
- Completion timestamp
- IP address (for analytics)
- User agent (browser info)
- All question answers

## Accessing Results

### Option 1: Via API Endpoints

The backend provides several endpoints to access results:

#### 1. Get All Responses for a Survey
```bash
GET https://your-backend-url.railway.app/api/responses/survey/{surveyId}
```

**Example:**
```bash
curl https://your-backend-url.railway.app/api/responses/survey/panaya-sdr-survey
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "responses": [
    {
      "id": "uuid",
      "survey_id": "panaya-sdr-survey",
      "completed_at": "2025-01-15T10:30:00Z",
      "answer_count": 5
    }
  ]
}
```

#### 2. Get Detailed Response
```bash
GET https://your-backend-url.railway.app/api/responses/response/{responseId}
```

**Response:**
```json
{
  "success": true,
  "response": {
    "id": "uuid",
    "survey_id": "panaya-sdr-survey",
    "completed_at": "2025-01-15T10:30:00Z"
  },
  "answers": [
    {
      "questionId": "role_tenure",
      "answer": "1-2 years",
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

#### 3. Export as CSV
```bash
GET https://your-backend-url.railway.app/api/responses/export/{surveyId}
```

This downloads a CSV file with all responses for the survey.

### Option 2: Direct Database Access (Railway)

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Select your project
   - Click on your PostgreSQL database

2. **Open Database**
   - Click "Query" or "Connect" button
   - Use Railway's built-in database viewer

3. **Query Results**
   ```sql
   -- Get all responses for SDR survey
   SELECT * FROM survey_responses 
   WHERE survey_id = 'panaya-sdr-survey'
   ORDER BY completed_at DESC;

   -- Get responses with answers
   SELECT 
     sr.id,
     sr.survey_id,
     sr.completed_at,
     sra.question_id,
     sra.answer_value
   FROM survey_responses sr
   JOIN survey_response_answers sra ON sr.id = sra.response_id
   WHERE sr.survey_id = 'panaya-sdr-survey'
   ORDER BY sr.completed_at DESC, sra.question_id;
   ```

### Option 3: Create a Results Dashboard (Future)

You can build a simple admin dashboard to view results. The API endpoints are ready for this.

## Survey IDs

- **SDR Survey**: `panaya-sdr-survey`
- **Marketing Ops Survey**: `panaya-marketing-ops-survey`

## Example: Viewing Results via API

### Using curl
```bash
# Get all SDR survey responses
curl https://your-backend-url.railway.app/api/responses/survey/panaya-sdr-survey

# Export as CSV
curl https://your-backend-url.railway.app/api/responses/export/panaya-sdr-survey -o sdr-responses.csv
```

### Using JavaScript/TypeScript
```typescript
import { getSurveyResponses, exportSurveyResponses } from './services/api';

// Get all responses
const responses = await getSurveyResponses('panaya-sdr-survey');
console.log(`Total responses: ${responses.count}`);

// Export to CSV
const blob = await exportSurveyResponses('panaya-sdr-survey');
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'sdr-responses.csv';
a.click();
```

## Setting Up Access

### 1. Deploy Backend to Railway

1. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Select the `backend` folder

2. **Add PostgreSQL Database**
   - In Railway project, click "New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will provide `DATABASE_URL` automatically

3. **Set Environment Variables**
   - In Railway, go to your backend service
   - Click "Variables"
   - Add:
     - `DATABASE_URL` (auto-provided by Railway)
     - `FRONTEND_URL` (your Vercel URL, e.g., `https://your-app.vercel.app`)
     - `PORT` (Railway sets this automatically)

4. **Deploy**
   - Railway will automatically deploy when you push to GitHub
   - Check logs to ensure database initialized

### 2. Update Frontend API URL

1. **Add Environment Variable to Vercel**
   - Go to Vercel project settings
   - Add environment variable:
     - Key: `VITE_API_URL`
     - Value: `https://your-backend.railway.app`
   - Redeploy frontend

2. **Or Update Locally**
   Create `.env.local`:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

## Security Notes

- The API endpoints are currently public (no authentication)
- For production, consider adding:
  - API key authentication
  - Rate limiting
  - IP whitelisting for admin endpoints
  - User authentication for viewing results

## Troubleshooting

### Can't Connect to Database
- Check `DATABASE_URL` is set in Railway
- Verify database is running
- Check Railway logs for connection errors

### API Returns 500 Error
- Check Railway logs for backend errors
- Verify database tables were created
- Ensure `DATABASE_URL` is correct

### No Results Showing
- Verify survey ID matches exactly
- Check database has data: `SELECT COUNT(*) FROM survey_responses;`
- Verify frontend is calling correct API URL

## Next Steps

1. **Deploy backend to Railway** (see above)
2. **Test API endpoints** using curl or Postman
3. **View results** via Railway database or API
4. **Export CSV** for analysis in Excel/Google Sheets
5. **Build admin dashboard** (optional) for easier viewing

## Quick Reference

**Backend URL**: `https://your-backend.railway.app`  
**API Base**: `/api/responses`  
**Health Check**: `/health`

**Endpoints**:
- `POST /api/responses/submit` - Submit survey
- `GET /api/responses/survey/:surveyId` - Get all responses
- `GET /api/responses/response/:responseId` - Get single response
- `GET /api/responses/export/:surveyId` - Export CSV

