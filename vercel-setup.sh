#!/bin/bash

# Vercel Setup Script
# Run this after getting your Railway backend URL

echo "🚀 Vercel Setup for G2M Survey Platform"
echo ""
echo "This script will help you set up Vercel deployment."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "📝 Please provide your Railway backend URL:"
read -p "Railway Backend URL: " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo "❌ Railway URL is required!"
    exit 1
fi

echo ""
echo "🔐 Logging in to Vercel..."
vercel login

echo ""
echo "🌍 Setting environment variable..."
vercel env add VITE_API_URL production <<< "$RAILWAY_URL"
vercel env add VITE_API_URL preview <<< "$RAILWAY_URL"
vercel env add VITE_API_URL development <<< "$RAILWAY_URL"

echo ""
echo "🚀 Deploying to Vercel..."
vercel

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Your app should be live at the URL shown above"
echo "2. Test survey submission"
echo "3. Check Railway database for saved responses"
echo ""
echo "To deploy to production:"
echo "  vercel --prod"

