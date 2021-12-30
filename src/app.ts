import express from 'express';
import { Request, Response, NextFunction } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authentication  from './controllers/auth';
import theTransactions from './controllers/transactions';

export const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.get('/', async (req:Request, res:Response, next: NextFunction)=>{
    try {
        const welcomeMsg = 'Welcome to MoneyMoves Share and get money!';
        res.json(welcomeMsg);
    } catch (error) {
        next(error);
    }
    
})



app.use('/auth', authentication)
app.use('/transactions', theTransactions)