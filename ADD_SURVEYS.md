# How to Add Surveys

## Current Status

✅ **Marketing Operations Survey**: Fully converted and ready (30 questions)  
⚠️ **SDR Survey**: Currently has placeholder questions (needs your actual questions)

## Option 1: Use the Import Feature (Recommended)

### Step 1: Get Your Survey Text
- Have your SDR survey questions ready in text format
- Same format as the Marketing Ops survey you provided

### Step 2: Import via UI
1. Visit your site → `/import`
2. Paste your SDR survey text
3. Enter survey ID: `panaya-sdr-survey`
4. Click "Convert Survey"
5. Download the generated file

### Step 3: Add to Project
1. Save the downloaded file as `src/data/surveys/sdrSurvey.ts`
2. Update `src/data/surveys/index.ts` to import it
3. Commit and push

## Option 2: Manual Conversion

### Step 1: Provide Survey Text
Just paste your SDR survey questions in the same format as Marketing Ops, and I'll convert it for you.

### Step 2: I'll Convert It
I'll structure it properly and add it to `src/data/surveys/sdrSurvey.ts`

## Current SDR Survey

The SDR survey currently has basic placeholder questions. To replace them:

1. **Provide the actual SDR survey questions** (in text format)
2. I'll convert them using the same structure as Marketing Ops
3. Update the file and push to GitHub

## Survey Format Example

Your survey text should look like:

```
Panaya SDR Enablement Questionnaire

Section 1: Role Context
1. How long have you been in your SDR role?
Multiple choice
  • Less than 6 months
  • 6-12 months
  • 1-2 years
  • 2+ years
Required: Yes

2. What is your primary target market?
Multiple choice
  • SMB
  • Mid-Market
  • Enterprise
Required: Yes
```

I'll convert this automatically to the proper TypeScript format!

## Quick Steps

1. **For SDR Survey**: Provide the text, I'll convert it
2. **For Future Surveys**: Use the `/import` page with Gemini AI
3. **All surveys** are stored in `src/data/surveys/`

Ready when you are! Just provide the SDR survey questions.

