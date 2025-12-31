# Troubleshooting Guide

## Network Error When Submitting Survey

If you're seeing "Network error. Please check your connection and try again." when submitting a survey, check the following:

### 1. Check Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Verify `VITE_API_URL` is set:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://surveypro-production.up.railway.app`)
   - **Environment**: Production, Preview, Development (set for all)

4. **Important**: After adding/updating environment variables, you must **redeploy** your Vercel project

### 2. Verify Railway Backend is Running

1. Go to Railway dashboard
2. Check your backend service is running (green status)
3. Click on the service → **Settings** → **Domains**
4. Copy the public domain URL
5. Test the health endpoint: `https://your-railway-url.up.railway.app/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

### 3. Check Browser Console

1. Open your deployed Vercel site
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Try submitting a survey
5. Look for error messages that show:
   - The API URL being used
   - The actual error message
   - CORS errors

### 4. Check CORS Settings

In Railway backend, verify `FRONTEND_URL` is set:

1. Railway → Your backend service → **Variables**
2. Ensure `FRONTEND_URL` is set to your Vercel URL:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-vercel-app.vercel.app`
3. Redeploy backend after adding

### 5. Test Backend Directly

Test if the backend is accessible:

```bash
# Test health endpoint
curl https://your-railway-url.up.railway.app/health

# Test submit endpoint (should return validation error, not network error)
curl -X POST https://your-railway-url.up.railway.app/api/responses/submit \
  -H "Content-Type: application/json" \
  -d '{"surveyId":"test","answers":{}}'
```

### 6. Common Issues

#### Issue: `VITE_API_URL` not set
**Solution**: Add it in Vercel environment variables and redeploy

#### Issue: Wrong API URL format
**Solution**: Ensure URL doesn't have trailing slash:
- ✅ Correct: `https://surveypro-production.up.railway.app`
- ❌ Wrong: `https://surveypro-production.up.railway.app/`

#### Issue: CORS error in console
**Solution**: 
1. Check `FRONTEND_URL` in Railway matches your Vercel URL exactly
2. Ensure no trailing slashes
3. Redeploy backend after updating

#### Issue: Backend not responding
**Solution**:
1. Check Railway logs for errors
2. Verify database connection
3. Check Railway service is running

### 7. Quick Checklist

- [ ] `VITE_API_URL` set in Vercel (all environments)
- [ ] Vercel project redeployed after adding env var
- [ ] Railway backend is running (green status)
- [ ] `FRONTEND_URL` set in Railway
- [ ] Railway backend redeployed after adding env var
- [ ] Health endpoint works: `/health`
- [ ] No CORS errors in browser console
- [ ] API URL in console logs matches Railway URL

### 8. Debug Mode

The updated error messages will now show:
- The API URL being used
- More detailed error information
- Whether `VITE_API_URL` is set

Check the browser console for these details when the error occurs.

