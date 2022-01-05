import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const ensureAuth = (req:Request, res:Response, next: NextFunction)=>{ 
    try {
        const { mm_session } = req.cookies;
        req.user = jwt.verify(mm_session, process.env.APP_SECRET);
        next();

    } catch (error) {
        next(error);
    }
}

export default ensureAuth;