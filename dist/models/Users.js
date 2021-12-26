"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const pool_1 = require("../utils/pool");
class User {
    constructor(row) {
        this.row = row;
        this.name = row.name;
        this.email = row.email;
        this.password_hash = row.password_hash;
    }
    static async InsertUser(user) {
        const { rows } = await pool_1.pool.query(`INSERT INTO users_active (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *`, [user.name, user.email, user.password_hash]);
        return new User(rows[0]);
    }
}
exports.User = User;
