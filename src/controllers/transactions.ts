import { Router, Request, Response, NextFunction } from "express";
import { TransactionServices } from "../services/TransactionSevices";
import { Transaction } from "../models/Transactions";


const theTransactions = Router();

theTransactions.post('/makeTransaction', async (req: Request, res:Response, next: NextFunction)=>{
    try {
        const newTransaction = await TransactionServices.createTransaction(req.body);
        console.log('REQUEST', req);
        console.log('BODY',req.body);
        res.send(newTransaction);
    } catch (error) {
        next(error);
    }
})



export default theTransactions;