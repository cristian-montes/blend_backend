import { User } from "../models/Users";
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

export class UserServices{
    
    static async create(user: {id:string; name:string; email:string; password_hash:string;}){
        // console.log('USER', user);
        const passwordHash = await bcrypt.hash( user.password_hash, Number(process.env.SALT_ROUNDS));
        user.password_hash = passwordHash;
        const newUser = await User.InsertUser(user);
        return newUser;
    }

    static async authorize(user:{email:string; password_hash:string;}){
        try {
            const existingUser = await User.findByEmail(user.email);

            const passwordMatching = await bcrypt.compare(user.password_hash, existingUser.password_hash);
            if(!passwordMatching) throw new Error('Invalid Password');

            return existingUser;

        } catch (err:any) {
            err.status = 401;
            throw err;
        }
    }


    // static authToken(theUser:any) {
    //     return jwt.sign({ theUser: theUser.toJSON() }, process.env.APP_SECRET, {
    //       expiresIn: '24h'
    //     });
    //   }

      //*************WE NEED TO DOUBLE CHECK */
    //   static verifyAuthToken(token:string) {
    //     const verification = jwt.verify(token, process.env.APP_SECRET);
    //     return verification;
    //   }


}