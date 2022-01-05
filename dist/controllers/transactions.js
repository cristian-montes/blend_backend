"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TransactionSevices_1 = require("../services/TransactionSevices");
const ensureAuth_1 = __importDefault(require("../middleware/ensureAuth"));
const Users_1 = require("../models/Users");
const theTransactions = (0, express_1.Router)();
theTransactions.get('/searchrecipient/:email', ensureAuth_1.default, async (req, res, next) => {
    try {
        const searchedRecipient = await Users_1.User.findByEmail(req.params.email);
        res.send(searchedRecipient);
    }
    catch (error) {
        next(error);
    }
});
theTransactions.post('/makeTransaction', ensureAuth_1.default, async (req, res, next) => {
    try {
        const newTransaction = await TransactionSevices_1.TransactionServices.createTransaction({ sender_id: req.user.id, ...req.body });
        res.send(newTransaction);
    }
    catch (error) {
        next(error);
    }
});
theTransactions.get('/transactionhistory', ensureAuth_1.default, async (req, res, next) => {
    try {
        const userTransactionHistoty = await Users_1.User.getUserTransactionsById(req.user.id);
        res.send(userTransactionHistoty);
    }
    catch (error) {
        next(error);
    }
});
exports.default = theTransactions;
