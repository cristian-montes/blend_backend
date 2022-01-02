"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const pool_1 = require("../utils/pool");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User {
    constructor(row) {
        this.row = row;
        this.id = row.id;
        this.name = row.name;
        this.email = row.email;
        this.password_hash = row.password_hash;
        this.connected_acct_id = row.connected_acct_id;
    }
    static async InsertUser(user) {
        const { rows } = await pool_1.pool.query(`INSERT INTO users_active (name, email, password_hash, connected_acct_id) VALUES ($1, $2, $3, $4) RETURNING *`, [user.name, user.email, user.password_hash, user.connected_acct_id]);
        return new User(rows[0]);
    }
    static async findByEmail(email) {
        const { rows } = await pool_1.pool.query('SELECT * FROM users_active WHERE email=$1', [email]);
        if (!rows[0])
            throw new Error('No accounts registered under this email address');
        return new User(rows[0]);
    }
    static async findById(id) {
        const { rows } = await pool_1.pool.query('SELECT FROM users_active WHERE id=$1', [id]);
        if (!rows[0])
            throw new Error(`No user with Connected Acct Id: ${id}`);
        return new User(rows[0]);
    }
    static async getUserTransactionsById(id) {
        const { rows } = await pool_1.pool.query(`SELECT users_active.id, name, email, amount 
                FROM transactions
            LEFT JOIN users_active ON users_active.id = transactions.recipient_id
            WHERE sender_id=$1
            ORDER BY transactions.amount`, [id]);
        return rows;
    }
    //-------------------------------------------------------------------------------------//
    authToken() {
        console.log('AUTHTOKEN', this.row);
        return jsonwebtoken_1.default.sign(this.toJSON(), process.env.APP_SECRET, {
            expiresIn: '24h'
        });
    }
    //------------------------------------------------------------------------------------//
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password_hash: this.password_hash,
            connected_acct_id: this.connected_acct_id
        };
    }
}
exports.User = User;
