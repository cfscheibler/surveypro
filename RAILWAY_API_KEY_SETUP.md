# Railway API Key Setup

## Add Google Gemini API Key to Railway

### Step 1: Go to Railway Variables

1. Open your Railway project
2. Click on your `surveypro` backend service
3. Go to the **"Variables"** tab

### Step 2: Add API Key

1. Click **"+ New Variable"**
2. Add:
   - **Key**: `GOOGLE_GEMINI_API_KEY`
   - **Value**: `AIzaSyDbFHxCvWL6SdFXcK7DPk-HL0EyvPlGWIc`
3. Click **"Save"**

### Step 3: Redeploy

Railway will automatically redeploy your service with the new environment variable.

## Verify It's Working

After redeploy, test the import feature:
1. Visit your Vercel site → `/import`
2. Paste some survey text
3. Click "Convert Survey"
4. Should work without errors

## Model Configuration

- **Model**: `gemini-3-pro-preview`
- **API Key**: Set in Railway as `GOOGLE_GEMINI_API_KEY`
- **Location**: Backend service environment variables

## Security Note

⚠️ The API key is now in Railway environment variables (secure). Never commit API keys to git.

