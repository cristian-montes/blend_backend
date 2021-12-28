import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false } ?  false : true
});

pool.on('connect', () => console.log('Postgres connected'));

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.DATABASE_URL ? true : false
// })

// pool.on('connect', () => console.log('Postgres connected'));


// const rejectUnauthorized = process.env.PGSSLMODE ? { rejectUnauthorized: false} : { rejectUnauthorized: true}

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl:rejectUnauthorized,
// });

// pool.on('connect', () => console.log('Postgres connected'))