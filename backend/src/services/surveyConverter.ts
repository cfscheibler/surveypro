import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Survey } from '../types/survey.js';

// Initialize Gemini (using Vertex AI or standard API)
function getGeminiClient() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not set');
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Convert survey text to structured Survey format using Gemini
 */
export async function convertSurveyTextToJSON(
  surveyText: string,
  surveyId?: string
): Promise<Survey> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a survey conversion expert. Convert the following survey text into a valid JSON format matching this TypeScript interface:

interface Survey {
  id: string;
  title: string;
  description: string;
  sections: Array<{
    id: string;
    title: string;
    description?: string;
    questions: Array<{
      id: string;
      type: 'multiple-choice' | 'checkboxes' | 'short-answer' | 'paragraph';
      text: string;
      options?: string[];
      placeholder?: string;
      required?: boolean;
      logic?: {
        on: string | string[];
        goToQuestionId?: string;
        skipToSectionId?: string;
      };
      hint?: string;
    }>;
  }>;
}

Rules:
1. Generate unique IDs using kebab-case (e.g., "role-scope", "primary-role")
2. Extract the survey title from the text
3. Extract description if provided
4. Group questions into logical sections
5. Determine question types from context:
   - "Multiple choice" or "Select one" → 'multiple-choice'
   - "Checkboxes" or "Select all" → 'checkboxes'
   - "Short answer" or "Text input" → 'short-answer'
   - "Paragraph" or "Long answer" → 'paragraph'
6. Extract options for multiple-choice and checkboxes
7. Mark required fields if indicated
8. Parse logic rules (e.g., "If Yes, go to Question 15" → logic: { on: 'Yes', goToQuestionId: 'question-15-id' })
9. Extract hints and placeholders where provided

Survey Text:
${surveyText}

${surveyId ? `Use this survey ID: ${surveyId}` : 'Generate a unique survey ID using kebab-case'}

Return ONLY valid JSON, no markdown, no code blocks, just the JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean up the response (remove markdown code blocks if present)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    const survey = JSON.parse(jsonText) as Survey;

    // Validate the structure
    if (!survey.id || !survey.title || !survey.sections) {
      throw new Error('Invalid survey structure returned from AI');
    }

    return survey;
  } catch (error) {
    console.error('Error converting survey text:', error);
    throw new Error(`Failed to convert survey text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate survey structure
 */
export function validateSurvey(survey: unknown): survey is Survey {
  if (typeof survey !== 'object' || survey === null) {
    return false;
  }

  const s = survey as Record<string, unknown>;
  
  if (typeof s.id !== 'string' || typeof s.title !== 'string') {
    return false;
  }

  if (!Array.isArray(s.sections)) {
    return false;
  }

  return s.sections.every((section: unknown) => {
    if (typeof section !== 'object' || section === null) {
      return false;
    }
    const sec = section as Record<string, unknown>;
    return (
      typeof sec.id === 'string' &&
      typeof sec.title === 'string' &&
      Array.isArray(sec.questions)
    );
  });
}

