import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const ensureAuth = (req:Request, res:Response, next: NextFunction)=>{ 
    try {
        const userData = req.cookies;

        const user = jwt.verify(userData.session, process.env.APP_SECRET);

        // req.user = user --> LOOK AT THIS OBJECT WHEN CREATED TO GRAB THE RIGHT KEY

    } catch (error) {
        next(error);
    }
}

export default ensureAuth;