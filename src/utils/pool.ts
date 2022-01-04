import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false } ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => console.log('Postgres connected'));