# Google Gemini API Setup

This guide explains how to set up Google Gemini API for automatic survey text conversion.

## Option 1: Google AI Studio (Free Tier - Recommended for Testing)

### Step 1: Get API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### Step 2: Add to Railway

1. Go to your Railway backend service
2. Open "Variables" tab
3. Add new variable:
   - **Key**: `GOOGLE_GEMINI_API_KEY`
   - **Value**: Your API key from Google AI Studio
4. Save

### Step 3: Redeploy

Railway will automatically redeploy with the new environment variable.

## Option 2: Vertex AI (Production - More Control)

If you need Vertex AI for production use:

### Step 1: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Vertex AI API
4. Create a service account
5. Download JSON credentials

### Step 2: Update Code

The current implementation uses `@google/generative-ai` which works with both:
- Google AI Studio (free tier)
- Vertex AI (production)

For Vertex AI, you may need to update the authentication method in `backend/src/services/surveyConverter.ts`.

### Step 3: Add Credentials to Railway

1. Upload service account JSON to Railway
2. Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable
3. Or use the API key method (simpler)

## Current Implementation

The code uses `@google/generative-ai` package which supports:
- **Model**: `gemini-pro` (or `gemini-1.5-pro` for better results)
- **Authentication**: API key via `GOOGLE_GEMINI_API_KEY` environment variable

## Testing

1. Deploy backend with `GOOGLE_GEMINI_API_KEY` set
2. Visit `/import` page on your frontend
3. Paste survey text or upload file
4. Click "Convert Survey"
5. Review the converted JSON

## API Limits

### Google AI Studio (Free)
- 15 requests per minute
- 1,500 requests per day
- Good for testing and low-volume use

### Vertex AI (Paid)
- Higher rate limits
- Better for production
- Pay per use

## Troubleshooting

### "GOOGLE_GEMINI_API_KEY is not set"
- Make sure environment variable is set in Railway
- Check variable name is exactly `GOOGLE_GEMINI_API_KEY`
- Redeploy after adding variable

### "Failed to convert survey"
- Check API key is valid
- Verify you have API quota remaining
- Check Railway logs for detailed error

### Rate Limit Errors
- Free tier has 15 requests/minute limit
- Wait a minute and try again
- Consider upgrading to Vertex AI for higher limits

## Cost

- **Google AI Studio**: Free for reasonable usage
- **Vertex AI**: Pay per API call (very affordable)
- Typical survey conversion: ~$0.001-0.01 per conversion

## Security

- Never commit API keys to git
- Use Railway environment variables
- Rotate keys periodically
- Monitor API usage

