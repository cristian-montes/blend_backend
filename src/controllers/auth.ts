import { Router, Request, Response, NextFunction } from "express";
import { UserServices } from "../services/UserServices";

const authentication = Router();
    authentication.post('/signup', async (req:Request, res:Response, next: NextFunction)=>{
        try {
            console.log('body', req.body);
            const newUser = await UserServices.create(req.body);
            

            res.send(newUser)
        } catch (error) {
            next(error);
        }
        
    })

export default authentication;