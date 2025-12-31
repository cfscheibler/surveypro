import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Get database URL from environment variable (Railway provides this)
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  console.warn('Warning: DATABASE_URL not set. Database features will not work.');
}

export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl?.includes('railway') ? { rejectUnauthorized: false } : undefined,
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

export async function initializeDatabase() {
  try {
    // Check if tables exist, if not create them
    const client = await pool.connect();
    
    // Create survey_responses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS survey_responses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        survey_id VARCHAR(255) NOT NULL,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create survey_response_answers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS survey_response_answers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        response_id UUID NOT NULL REFERENCES survey_responses(id) ON DELETE CASCADE,
        question_id VARCHAR(255) NOT NULL,
        answer_value TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_survey_responses_survey_id ON survey_responses(survey_id)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_response_answers_response_id ON survey_response_answers(response_id)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_response_answers_question_id ON survey_response_answers(question_id)
    `);

    client.release();
    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

