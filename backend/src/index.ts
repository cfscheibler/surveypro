import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './db/connection.js';
import responsesRouter from './routes/responses.js';
import surveysRouter from './routes/surveys.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// CORS configuration - allow Vercel preview and production URLs
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const frontendUrl = process.env.FRONTEND_URL;
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    // If FRONTEND_URL is not set, allow all origins (development)
    if (!frontendUrl) {
      return callback(null, true);
    }
    
    // Allow the exact FRONTEND_URL
    if (origin === frontendUrl) {
      return callback(null, true);
    }
    
    // Allow any vercel.app subdomain (handles preview deployments)
    if (origin.includes('vercel.app') && frontendUrl.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Reject other origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Log CORS configuration for debugging
console.log('🔒 CORS Configuration:');
console.log('  FRONTEND_URL:', process.env.FRONTEND_URL || 'Not set (using *)');
console.log('  Allowing origins:', corsOptions.origin);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trust proxy for Railway (to get correct IP addresses)
app.set('trust proxy', true);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/responses', responsesRouter);
app.use('/api/surveys', surveysRouter);

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`📝 API endpoint: http://localhost:${PORT}/api/responses`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

