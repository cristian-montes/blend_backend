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
    }
    static async InsertUser(user) {
        const { rows } = await pool_1.pool.query(`INSERT INTO users_active (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *`, [user.name, user.email, user.password_hash]);
        return new User(rows[0]);
    }
    static async findByEmail(email) {
        const { rows } = await pool_1.pool.query(`SELECT * FROM users_active WHERE email=$1`, [email]);
        if (!rows[0])
            throw new Error('No accounts registered under this email address');
        return new User(rows[0]);
    }
    //-------------------------------------------------------------------------------------//
    authToken() {
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
        };
    }
}
exports.User = User;
