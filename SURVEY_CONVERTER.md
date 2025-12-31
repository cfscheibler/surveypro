# Survey Text to Code Converter Guide

This guide helps you convert survey questions from text format to the proper TypeScript format.

## Format Recognition

The app can recognize this text format:

```
Survey Title

Form Description (optional)

⸻

Section 1: Section Name

1. Question text?
Type: multiple-choice / checkboxes / short-answer / paragraph
Options:
  • Option 1
  • Option 2
  • Required: Yes/No
  • Logic: If answer is X, go to question Y
```

## Quick Conversion Rules

### Question Types
- **Multiple choice** → `type: 'multiple-choice'`
- **Checkboxes** → `type: 'checkboxes'`
- **Short answer** → `type: 'short-answer'`
- **Paragraph** → `type: 'paragraph'`

### Required Fields
- If marked as required → `required: true`
- Otherwise → `required: false`

### Logic Rules
- "If Yes, go to Question 15" → `logic: { on: 'Yes', goToQuestionId: 'question-15-id' }`
- "If No, skip to Section 6" → `logic: { on: 'No', skipToSectionId: 'section-6-id' }`

## Example Conversion

### Text Format:
```
Section 5: Tools, Data & Trust

14. Do you ever upload or download CSVs as part of your workflow?
Multiple choice
  • Yes
  • No
Required: Yes
Logic: If Yes, go to Question 15

15. Where do these CSVs usually come from or go to?
Short answer
Hint: CSV = shadow attribution.
```

### Converted Code:
```typescript
{
    id: 'tools-data-trust',
    title: 'Tools, Data & Trust',
    questions: [
        {
            id: 'csv-workflow',
            type: 'multiple-choice',
            text: 'Do you ever upload or download CSVs as part of your workflow?',
            options: ['Yes', 'No'],
            required: true,
            logic: {
                on: 'Yes',
                goToQuestionId: 'csv-sources'
            }
        },
        {
            id: 'csv-sources',
            type: 'short-answer',
            text: 'Where do these CSVs usually come from or go to?',
            placeholder: 'Enter your answer...',
            required: false,
            hint: 'CSV = shadow attribution.'
        }
    ]
}
```

## ID Naming Convention

- **Section IDs**: Use kebab-case, e.g., `role-scope`, `whats-hard`
- **Question IDs**: Use kebab-case, e.g., `primary-role`, `csv-workflow`
- Keep IDs unique within the survey

## How to Use

### Option 1: Manual Conversion (Recommended for now)
1. Copy your survey text
2. Follow the format above
3. Create the TypeScript file
4. Add to `src/data/surveys/index.ts`

### Option 2: Ask for Help
Just paste your survey text and I'll convert it for you!

### Option 3: Future Auto-Converter (Coming Soon)
We can build a parser that automatically converts text format to code.

## Tips

1. **Keep IDs simple**: Use descriptive but short IDs
2. **Group related questions**: Put them in the same section
3. **Add placeholders**: Help users understand what to enter
4. **Use hints**: Add context with `hint` property
5. **Test logic rules**: Make sure skip/goTo logic works correctly

## Common Patterns

### Multiple Choice with "Other"
```typescript
{
    id: 'primary-role',
    type: 'multiple-choice',
    text: 'What is your primary role?',
    options: [
        'Demand Generation',
        'Product Marketing',
        'Other'
    ],
    required: true
}
```

### Checkboxes
```typescript
{
    id: 'automation-areas',
    type: 'checkboxes',
    text: 'Which areas would you like automated?',
    options: [
        'Lead enrichment',
        'Campaign tagging',
        'Reporting'
    ],
    required: false
}
```

### Conditional Logic
```typescript
{
    id: 'use-csv',
    type: 'multiple-choice',
    text: 'Do you use CSVs?',
    options: ['Yes', 'No'],
    required: true,
    logic: {
        on: 'Yes',
        goToQuestionId: 'csv-details'
    }
}
```

## Need Help?

Just provide your survey in text format and I'll convert it to the proper TypeScript structure!

