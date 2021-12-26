import { User } from "../models/Users";
import bcrypt from 'bcrypt';

export class UserServices{
    
    static async create(user: { name:string; email:string; password_hash:string;}){
        const passwordHash = await bcrypt.hash( user.password_hash, +process.env.SALT_ROUNDS);
        user.password_hash = passwordHash;
        const newUser = await User.InsertUser(user)
    }
}