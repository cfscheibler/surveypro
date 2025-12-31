# Favicon Setup Instructions

## Steps to Add Panaya Favicon

1. **Save the Image**
   - Save the Panaya logo image you shared
   - Name it: `panaya-favicon.png`
   - Save it to the `public/` folder

2. **Image Requirements**
   - **Format**: PNG (recommended) or ICO
   - **Size**: 32x32px or 64x64px (will be scaled)
   - **Location**: `/public/panaya-favicon.png`

3. **Alternative Formats**
   If you have the image in different formats:
   - PNG: `/public/panaya-favicon.png` (recommended)
   - ICO: `/public/panaya-favicon.ico`
   - SVG: `/public/panaya-favicon.svg` (if it's a vector)

4. **Update HTML** (Already done)
   The `index.html` has been updated to use:
   ```html
   <link rel="icon" type="image/png" href="/panaya-favicon.png" />
   ```

5. **After Adding the File**
   - The favicon will automatically appear after you:
     - Save the image to `public/panaya-favicon.png`
     - Commit and push to GitHub
     - Vercel will redeploy

## Current Setup

- ✅ HTML updated to reference `/panaya-favicon.png`
- ⏳ Waiting for you to add the image file to `public/` folder

## Quick Steps

1. Save your Panaya logo image
2. Rename it to `panaya-favicon.png`
3. Place it in: `/Users/cscheibler/Desktop/G2M/public/panaya-favicon.png`
4. Commit and push:
   ```bash
   git add public/panaya-favicon.png
   git commit -m "Add Panaya favicon"
   git push
   ```

The favicon will appear in browser tabs after deployment!

