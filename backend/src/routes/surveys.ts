import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { convertSurveyTextToJSON, validateSurvey } from '../services/surveyConverter.js';

const router = Router();

// Validation schema for survey conversion
const convertSurveySchema = z.object({
  surveyText: z.string().min(10, 'Survey text must be at least 10 characters'),
  surveyId: z.string().optional(),
});

// Convert survey text to JSON format
router.post('/convert', async (req: Request, res: Response) => {
  try {
    const validated = convertSurveySchema.parse(req.body);

    const survey = await convertSurveyTextToJSON(
      validated.surveyText,
      validated.surveyId
    );

    // Validate the returned survey
    if (!validateSurvey(survey)) {
      return res.status(500).json({
        success: false,
        message: 'Invalid survey structure returned from conversion',
      });
    }

    res.json({
      success: true,
      survey,
    });
  } catch (error) {
    console.error('Error converting survey:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request data',
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to convert survey',
    });
  }
});

export default router;

