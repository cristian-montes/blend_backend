import { Pool } from 'pg';

 export const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ...( process.env.PGSSLMODE ? {ssl: { rejectUnauthorized: false }} : {}),
    })

 pool.on('connect', ()=> console.log('Postgres connected'))