import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const ensureAuth = (req:Request, res:Response, next: NextFunction)=>{ 
    try {
        const { mm_session } = req.cookies;
        console.log('mm_session', mm_session)
        console.log("req.user", jwt.verify(mm_session, process.env.APP_SECRET)) //DELETE WHEN NO LONGER NEEDED
        
        req.user = jwt.verify(mm_session, process.env.APP_SECRET);
        next();

    } catch (error) {
        next(error);
    }
}

export default ensureAuth;