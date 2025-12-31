# Survey Setup Guide

This guide explains how to add the two Panaya surveys (SDR Team and Marketing Operations Team).

## Survey Files Location

Surveys are located in:
- `src/data/surveys/sdrSurvey.ts` - SDR Team Survey
- `src/data/surveys/marketingOpsSurvey.ts` - Marketing Operations Team Survey

## Survey Structure

Each survey follows this TypeScript structure:

```typescript
import type { Survey } from '../../types/survey';

export const sdrSurvey: Survey = {
    id: 'panaya-sdr-survey',  // Unique identifier
    title: 'Panaya SDR Team Survey',  // Display title
    description: 'Survey description...',  // Optional description
    sections: [
        {
            id: 'section-id',  // Unique section ID
            title: 'Section Title',
            description: 'Optional section description',
            questions: [
                {
                    id: 'question-id',  // Unique question ID
                    type: 'multiple-choice' | 'checkboxes' | 'short-answer' | 'paragraph',
                    text: 'Question text',
                    options: ['Option 1', 'Option 2'],  // Required for multiple-choice/checkboxes
                    placeholder: 'Placeholder text',  // Optional, for text inputs
                    required: true | false,
                    logic: {  // Optional logic rules
                        on: 'option-value',
                        goToQuestionId: 'target-question-id',
                        skipToSectionId: 'target-section-id'
                    },
                    hint: 'Optional hint text'
                }
            ]
        }
    ]
};
```

## Question Types

### 1. Multiple Choice (single selection)
```typescript
{
    id: 'question-1',
    type: 'multiple-choice',
    text: 'Select one option',
    options: ['Option A', 'Option B', 'Option C'],
    required: true
}
```

### 2. Checkboxes (multiple selection)
```typescript
{
    id: 'question-2',
    type: 'checkboxes',
    text: 'Select all that apply',
    options: ['Option A', 'Option B', 'Option C'],
    required: true
}
```

### 3. Short Answer (single line text)
```typescript
{
    id: 'question-3',
    type: 'short-answer',
    text: 'Enter your answer',
    placeholder: 'Type here...',
    required: false
}
```

### 4. Paragraph (multi-line text)
```typescript
{
    id: 'question-4',
    type: 'paragraph',
    text: 'Provide detailed feedback',
    placeholder: 'Enter your response...',
    required: false
}
```

## Logic Rules (Conditional Navigation)

You can skip questions or sections based on answers:

```typescript
{
    id: 'question-5',
    type: 'multiple-choice',
    text: 'Do you use CRM?',
    options: ['Yes', 'No'],
    required: true,
    logic: {
        on: 'No',  // If answer is "No"
        skipToSectionId: 'skip-crm-section'  // Skip to this section
    }
}
```

Or skip to a specific question:
```typescript
logic: {
    on: 'Yes',
    goToQuestionId: 'crm-details-question'
}
```

For multiple conditions:
```typescript
logic: {
    on: ['Option A', 'Option B'],  // If answer is either A or B
    goToQuestionId: 'target-question'
}
```

## Adding Your Surveys

### Step 1: Replace Placeholder Content

1. Open `src/data/surveys/sdrSurvey.ts`
2. Replace the placeholder content with your SDR survey questions
3. Open `src/data/surveys/marketingOpsSurvey.ts`
4. Replace the placeholder content with your Marketing Ops survey questions

### Step 2: Verify Survey IDs

Make sure the survey IDs match:
- SDR: `panaya-sdr-survey`
- Marketing Ops: `panaya-marketing-ops-survey`

These IDs are used in the URLs:
- `/survey/panaya-sdr-survey`
- `/survey/panaya-marketing-ops-survey`

### Step 3: Test Locally

1. Run `npm run dev`
2. Visit `http://localhost:5173/`
3. Click on each survey to test
4. Fill out the surveys to ensure everything works

### Step 4: Deploy

Once surveys are added and tested:
1. Commit changes to git
2. Push to GitHub
3. Vercel will automatically deploy

## Example: Complete Survey

```typescript
import type { Survey } from '../../types/survey';

export const exampleSurvey: Survey = {
    id: 'example-survey',
    title: 'Example Survey',
    description: 'This is an example survey',
    sections: [
        {
            id: 'demographics',
            title: 'Demographics',
            description: 'Tell us about yourself',
            questions: [
                {
                    id: 'age-range',
                    type: 'multiple-choice',
                    text: 'What is your age range?',
                    options: ['18-24', '25-34', '35-44', '45-54', '55+'],
                    required: true
                },
                {
                    id: 'location',
                    type: 'short-answer',
                    text: 'Where are you located?',
                    placeholder: 'City, State/Country',
                    required: true
                }
            ]
        },
        {
            id: 'feedback',
            title: 'Feedback',
            description: 'Share your thoughts',
            questions: [
                {
                    id: 'satisfaction',
                    type: 'multiple-choice',
                    text: 'How satisfied are you?',
                    options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
                    required: true,
                    logic: {
                        on: ['Dissatisfied', 'Very Dissatisfied'],
                        goToQuestionId: 'improvement-suggestions'
                    }
                },
                {
                    id: 'improvement-suggestions',
                    type: 'paragraph',
                    text: 'What could we improve?',
                    placeholder: 'Share your suggestions...',
                    required: false
                },
                {
                    id: 'additional-comments',
                    type: 'paragraph',
                    text: 'Any additional comments?',
                    placeholder: 'Enter your comments...',
                    required: false
                }
            ]
        }
    ]
};
```

## Tips

1. **Unique IDs**: Ensure all question and section IDs are unique within a survey
2. **Required Fields**: Mark important questions as `required: true`
3. **Logic Rules**: Test logic rules thoroughly to ensure correct navigation
4. **Options**: For multiple-choice/checkboxes, provide clear, non-overlapping options
5. **Placeholders**: Use helpful placeholder text to guide users
6. **Sections**: Group related questions into sections for better UX

## Need Help?

If you need assistance creating the surveys, provide:
1. The questions you want to ask
2. Question types for each
3. Any required fields
4. Any conditional logic needed

I can help format them into the proper structure!

