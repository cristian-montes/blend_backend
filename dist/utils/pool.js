"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
// import dotenv from 'dotenv';
// dotenv.config();
// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.PGSSLMODE && { rejectUnauthorized: false } ?  true : false
// });
// pool.on('connect', () => console.log('Postgres connected'));
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? true : false
});
exports.pool.on('connect', () => console.log('Postgres connected'));
// const rejectUnauthorized = process.env.PGSSLMODE ? { rejectUnauthorized: false} : { rejectUnauthorized: true}
// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl:rejectUnauthorized,
// });
// pool.on('connect', () => console.log('Postgres connected'))
