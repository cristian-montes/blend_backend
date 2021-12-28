import { Router, Request, Response, NextFunction } from "express";
import { TransactionServices } from "../services/TransactionSevices";
import { Transaction } from "../models/Transactions";
import ensureAuth from "../middleware/ensureAuth";


const theTransactions = Router();

theTransactions.post('/makeTransaction', ensureAuth,async (req: Request, res:Response, next: NextFunction)=>{
    try {
        const newTransaction = await TransactionServices.createTransaction({sender_id:req.user.id,...req.body});
       
        console.log('BODY',req.body);
        res.send(newTransaction);
    } catch (error) {
        next(error);
    }
})



export default theTransactions;