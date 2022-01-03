import { Router, Request, Response, NextFunction } from "express";
import ensureAuth from "../middleware/ensureAuth";
import { User } from "../models/Users";
import { UserServices } from "../services/UserServices";

// const attachCookie =(res:Response, theUser:any) => {
//     res.cookie('session', theUser.authToke(),{
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24,
//     })
// }

const authentication = Router();

    authentication.post('/signup', async (req:Request, res:Response, next: NextFunction)=>{
        try {
            const newUser = await UserServices.create(req.body);
            // attachCookie(res, newUser);
            const galleta = res.cookie('session', newUser.authToken(),{
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 2,
                domain:'http://localhost:3000'
            })

            console.log('GALLETA', galleta)
            res.send(newUser)
        } catch (error) {
            next(error);
        }
        
    })

    authentication.post('/signin', async (req:Request, res:Response, next: NextFunction)=>{
        try {
            const existingUser = await UserServices.authorize(req.body);
            // attachCookie(res, existingUser);
            const galleta = res.cookie('session', existingUser.authToken(),{
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 2,
                domain:'http://localhost:3000'
            })
            console.log('GALLETA', galleta)

            res.send(existingUser)
        } catch (error) {
            next(error);
        }
    })

    authentication.get('/logout', async (req:Request, res:Response, next:NextFunction)=>{
        try {
            res.clearCookie('session', {
                httpOnly: true
            });
            res.send('Sad to see you not do more money moves for now :(');
        } catch (error) {
            next(error);
        }
    })



export default authentication;