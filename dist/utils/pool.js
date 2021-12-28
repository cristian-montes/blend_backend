"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE && { rejectUnauthorized: false } ? false : true
});
exports.pool.on('connect', () => console.log('Postgres connected'));
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
