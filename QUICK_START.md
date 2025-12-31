# Quick Start Guide

## Current Status

✅ **Ready for Survey Data**

The application is set up and ready to receive your two Panaya surveys:
1. SDR Team Survey
2. Marketing Operations Team Survey

## What's Been Set Up

1. ✅ Multiple survey support system
2. ✅ Survey routing (`/survey/:surveyId`)
3. ✅ Home page with survey selection
4. ✅ Placeholder survey files created
5. ✅ Vercel deployment configuration
6. ✅ Survey registry system

## Next Steps

### 1. Add Your Survey Data

I'm ready to receive your survey questions! You can provide them in any format, and I'll help structure them properly.

**Files to update:**
- `src/data/surveys/sdrSurvey.ts` - SDR Team Survey
- `src/data/surveys/marketingOpsSurvey.ts` - Marketing Operations Team Survey

### 2. Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173/` to see:
- Home page with both surveys listed
- Click on a survey to take it
- Complete the survey and see thank you page

### 3. Deploy to Vercel

Once surveys are added:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Add Panaya surveys"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your surveys will be live

## Survey Structure Reference

When providing your surveys, I'll need:

### For Each Survey:
- **Title**: Survey name
- **Description**: Brief description
- **Sections**: Grouped questions
  - Section title
  - Section description (optional)
  - Questions in that section

### For Each Question:
- **Question text**: What to ask
- **Type**: 
  - `multiple-choice` (single selection)
  - `checkboxes` (multiple selection)
  - `short-answer` (single line text)
  - `paragraph` (multi-line text)
- **Options**: If multiple-choice or checkboxes
- **Required**: Yes/No
- **Logic rules**: Any skip/goTo logic (optional)

## Example Format

You can provide surveys like this:

**SDR Survey:**
- Section 1: Role Context
  - How long have you been in your SDR role? (multiple-choice)
    - Options: Less than 6 months, 6-12 months, 1-2 years, 2+ years
    - Required: Yes
  - What is your primary target market? (multiple-choice)
    - Options: SMB, Mid-Market, Enterprise, Strategic
    - Required: Yes

- Section 2: Pain Points
  - What is your biggest challenge? (multiple-choice)
    - Options: Not enough leads, Bad data quality, etc.
    - Required: Yes
  - Additional comments? (paragraph)
    - Required: No

I'll convert this into the proper TypeScript structure!

## Ready When You Are!

Just provide the survey questions in any format, and I'll:
1. Structure them properly
2. Add them to the correct files
3. Test that everything works
4. Help with deployment if needed

