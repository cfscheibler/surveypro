# G2M Backend API

Backend API for storing and retrieving survey responses.

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables
Create `.env` file:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/g2m_surveys
PORT=3001
FRONTEND_URL=http://localhost:5173
GOOGLE_GEMINI_API_KEY=your-gemini-api-key-here
```

**Note**: For survey import feature, you need a Google Gemini API key:
1. Get free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to `.env` as `GOOGLE_GEMINI_API_KEY`
3. See `GEMINI_SETUP.md` for detailed instructions

### 3. Initialize Database
The database tables will be created automatically on first run.

Or manually:
```bash
npm run migrate
```

### 4. Run Development Server
```bash
npm run dev
```

Server will run on `http://localhost:3001`

## API Endpoints

### Submit Survey Response
```
POST /api/responses/submit
Body: {
  "surveyId": "panaya-sdr-survey",
  "answers": {
    "question_id": "answer_value"
  }
}
```

### Get Survey Responses
```
GET /api/responses/survey/:surveyId
```

### Get Response Details
```
GET /api/responses/response/:responseId
```

### Export Responses (CSV)
```
GET /api/responses/export/:surveyId
```

## Deployment to Railway

1. **Connect GitHub Repo**
   - Railway will auto-detect the backend folder

2. **Add PostgreSQL Database**
   - Railway will provide `DATABASE_URL` automatically

3. **Set Environment Variables**
   - `FRONTEND_URL`: Your Vercel frontend URL
   - `DATABASE_URL`: Auto-provided by Railway

4. **Deploy**
   - Railway auto-deploys on git push

## Database Schema

- `survey_responses` - Main response records
- `survey_response_answers` - Individual question answers

See `src/db/schema.sql` for full schema.

