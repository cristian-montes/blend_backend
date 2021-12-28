"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TransactionSevices_1 = require("../services/TransactionSevices");
const theTransactions = (0, express_1.Router)();
theTransactions.post('/makeTransaction', async (req, res, next) => {
    try {
        const newTransaction = await TransactionSevices_1.TransactionServices.createTransaction(req.body);
        console.log('REQUEST', req);
        console.log('BODY', req.body);
        res.send(newTransaction);
    }
    catch (error) {
        next(error);
    }
});
exports.default = theTransactions;
