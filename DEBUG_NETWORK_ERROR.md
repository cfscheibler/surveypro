# Debug Network Error - Step by Step

Since `VITE_API_URL` is already set in Vercel, let's check the other common issues:

## Step 1: Verify Railway Backend is Running

1. Go to Railway dashboard
2. Check your backend service status (should be green/running)
3. Click on your backend service
4. Go to **Settings** → **Domains**
5. Copy the public domain (should match: `https://surveypro-production.up.railway.app`)

## Step 2: Test Backend Health Endpoint

Open in browser or use curl:
```
https://surveypro-production.up.railway.app/health
```

Expected response:
```json
{"status":"ok","timestamp":"2025-01-01T..."}
```

If this doesn't work, the backend is down or not accessible.

## Step 3: Check FRONTEND_URL in Railway

1. Railway → Your backend service → **Variables** tab
2. Check if `FRONTEND_URL` is set
3. It should be your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
4. If missing or wrong, add/update it:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel app URL (no trailing slash)
5. **Redeploy backend** after adding/updating

## Step 4: Check Browser Console

1. Open your Vercel site
2. Open DevTools (F12)
3. Go to **Console** tab
4. Try submitting a survey
5. Look for:
   - "Submitting to: https://surveypro-production.up.railway.app/api/responses/submit"
   - "API_BASE_URL: https://surveypro-production.up.railway.app"
   - Any CORS errors (red text mentioning CORS)
   - Any network errors

## Step 5: Check Network Tab

1. In DevTools, go to **Network** tab
2. Try submitting survey
3. Look for the request to `/api/responses/submit`
4. Click on it to see:
   - **Status**: Should be 200 (success) or show error code
   - **Headers**: Check if CORS headers are present
   - **Response**: See what the server returned

## Step 6: Test Backend Directly

Test if the submit endpoint works:

```bash
curl -X POST https://surveypro-production.up.railway.app/api/responses/submit \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-vercel-app.vercel.app" \
  -d '{
    "surveyId": "panaya-sdr-survey",
    "answers": {
      "test-question": "test answer"
    }
  }'
```

This will show if:
- Backend is accessible
- CORS is blocking requests
- Endpoint is working

## Common Issues

### Issue: CORS Error in Console
**Error**: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution**:
1. Set `FRONTEND_URL` in Railway to your exact Vercel URL
2. Ensure no trailing slashes
3. Redeploy Railway backend

### Issue: 404 Not Found
**Error**: `Failed to fetch` or `404`

**Solution**:
- Check the API URL is correct
- Verify backend routes are `/api/responses/submit`
- Check Railway logs for routing errors

### Issue: 500 Internal Server Error
**Error**: Server error in response

**Solution**:
- Check Railway logs for database connection errors
- Verify database is connected
- Check Railway logs tab for detailed errors

### Issue: Connection Refused / Timeout
**Error**: Network error, connection refused

**Solution**:
- Backend might be down
- Check Railway service status
- Verify Railway service is running
- Check Railway logs

## Quick Test

Run this in your browser console on your Vercel site:

```javascript
fetch('https://surveypro-production.up.railway.app/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

If this works, the backend is accessible. If it fails, there's a network/CORS issue.

