import { Router, Request, Response, NextFunction } from "express";
import { UserServices } from "../services/UserServices";

const authentication = Router();
    authentication.post('/signup', async (req:Request, res:Response, next: NextFunction)=>{
        try {
            const newUser = await UserServices.create(req.body);
            res.send(newUser)
        } catch (error) {
            next(error);
        }
        
    })

    authentication.post('/signin', async (req:Request, res:Response, next: NextFunction)=>{
        try {
            const existingUser = await UserServices.authorize(req.body);
            res.send(existingUser)
        } catch (error) {
            next(error);
        }
    })



export default authentication;