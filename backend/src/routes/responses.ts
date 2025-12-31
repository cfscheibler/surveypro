import { Router, Request, Response } from 'express';
import { pool } from '../db/connection.js';
import { z } from 'zod';

const router = Router();

// Validation schema for survey submission
const submitResponseSchema = z.object({
  surveyId: z.string(),
  answers: z.record(z.union([z.string(), z.array(z.string())])),
});

// Submit survey response
router.post('/submit', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validated = submitResponseSchema.parse(req.body);

    const client = await pool.connect();

    try {
      // Start transaction
      await client.query('BEGIN');

      // Get IP address and user agent
      const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'] || '';

      // Insert survey response
      const responseResult = await client.query(
        `INSERT INTO survey_responses (survey_id, completed_at, ip_address, user_agent)
         VALUES ($1, CURRENT_TIMESTAMP, $2, $3)
         RETURNING id`,
        [validated.surveyId, ipAddress, userAgent]
      );

      const responseId = responseResult.rows[0].id;

      // Insert answers
      const answerPromises = Object.entries(validated.answers).map(([questionId, answerValue]) => {
        const value = Array.isArray(answerValue) 
          ? JSON.stringify(answerValue) 
          : String(answerValue);
        
        return client.query(
          `INSERT INTO survey_response_answers (response_id, question_id, answer_value)
           VALUES ($1, $2, $3)`,
          [responseId, questionId, value]
        );
      });

      await Promise.all(answerPromises);

      // Commit transaction
      await client.query('COMMIT');

      res.status(201).json({
        success: true,
        message: 'Survey response submitted successfully',
        responseId: responseId,
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error submitting survey response:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request data',
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit survey response',
    });
  }
});

// Get all responses for a survey
router.get('/survey/:surveyId', async (req: Request, res: Response) => {
  try {
    const { surveyId } = req.params;

    const client = await pool.connect();

    try {
      // Get all responses for this survey
      const responsesResult = await client.query(
        `SELECT 
          sr.id,
          sr.survey_id,
          sr.started_at,
          sr.completed_at,
          sr.ip_address,
          sr.created_at,
          COUNT(sra.id) as answer_count
         FROM survey_responses sr
         LEFT JOIN survey_response_answers sra ON sr.id = sra.response_id
         WHERE sr.survey_id = $1
         GROUP BY sr.id
         ORDER BY sr.created_at DESC`,
        [surveyId]
      );

      res.json({
        success: true,
        count: responsesResult.rows.length,
        responses: responsesResult.rows,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch survey responses',
    });
  }
});

// Get detailed response with answers
router.get('/response/:responseId', async (req: Request, res: Response) => {
  try {
    const { responseId } = req.params;

    const client = await pool.connect();

    try {
      // Get response details
      const responseResult = await client.query(
        `SELECT * FROM survey_responses WHERE id = $1`,
        [responseId]
      );

      if (responseResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Response not found',
        });
      }

      // Get answers
      const answersResult = await client.query(
        `SELECT question_id, answer_value, created_at
         FROM survey_response_answers
         WHERE response_id = $1
         ORDER BY created_at`,
        [responseId]
      );

      res.json({
        success: true,
        response: responseResult.rows[0],
        answers: answersResult.rows.map((row) => ({
          questionId: row.question_id,
          answer: row.answer_value,
          createdAt: row.created_at,
        })),
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching response details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch response details',
    });
  }
});

// Export responses as CSV (for a survey)
router.get('/export/:surveyId', async (req: Request, res: Response) => {
  try {
    const { surveyId } = req.params;

    const client = await pool.connect();

    try {
      // Get all responses with answers
      const result = await client.query(
        `SELECT 
          sr.id as response_id,
          sr.completed_at,
          sra.question_id,
          sra.answer_value
         FROM survey_responses sr
         JOIN survey_response_answers sra ON sr.id = sra.response_id
         WHERE sr.survey_id = $1
         ORDER BY sr.completed_at, sra.question_id`,
        [surveyId]
      );

      // Convert to CSV format
      const csvRows: string[] = [];
      
      // Header
      csvRows.push('Response ID,Completed At,Question ID,Answer');

      // Data rows
      result.rows.forEach((row) => {
        const responseId = row.response_id;
        const completedAt = row.completed_at || '';
        const questionId = row.question_id;
        const answer = row.answer_value.replace(/"/g, '""'); // Escape quotes
        
        csvRows.push(`"${responseId}","${completedAt}","${questionId}","${answer}"`);
      });

      const csv = csvRows.join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="survey-${surveyId}-responses.csv"`);
      res.send(csv);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error exporting responses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export responses',
    });
  }
});

export default router;

