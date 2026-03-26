import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// High-performance middleware setup
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(morgan('dev')); // Logging for debugging

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle pg client', err);
  process.exit(-1);
});

// Basic Healthcheck API
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'main_api', message: 'Express Core API is running blazingly fast!' });
});

import onboardingRoutes from './routes/onboarding.js';
app.use('/api/onboarding', onboardingRoutes);

app.listen(PORT, () => {
  console.log(`Core Express API running on http://localhost:${PORT}`);
});
