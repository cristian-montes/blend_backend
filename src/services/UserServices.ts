import { User } from "../models/Users";
import bcrypt from 'bcrypt';

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



}