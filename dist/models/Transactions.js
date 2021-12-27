"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const pool_1 = require("../utils/pool");
class Transaction {
    constructor(row) {
        this.row = row;
        this.id = row.id;
        this.sender_id = row.sender_id;
        this.recipient_id = row.recipient_id;
        this.payment_method_id = row.payment_method_id;
        this.payment_intent_id = row.payment_intent_id;
        this.amount = row.amount;
        this.payment_confirmed = row.payment_confirmed;
    }
    static async insertTransaction(transaction) {
        const { rows } = await pool_1.pool.query(`INSERT INTO transactions (sender_id, recipient_id, payment_method_id, payment_intent_id, amount, payment_confirmed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [transaction.sender_id, transaction.recipient_id, transaction.payment_method_id, transaction.payment_intent_id, transaction.amount, transaction.payment_confirmed]);
        return new Transaction(rows[0]);
    }
}
exports.Transaction = Transaction;
