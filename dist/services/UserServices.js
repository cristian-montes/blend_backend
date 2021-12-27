"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const Users_1 = require("../models/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import jwt from 'jsonwebtoken';
class UserServices {
    static async create(user) {
        // console.log('USER', user);
        const passwordHash = await bcrypt_1.default.hash(user.password_hash, Number(process.env.SALT_ROUNDS));
        user.password_hash = passwordHash;
        const newUser = await Users_1.User.InsertUser(user);
        return newUser;
    }
    static async authorize(user) {
        try {
            const existingUser = await Users_1.User.findByEmail(user.email);
            const passwordMatching = await bcrypt_1.default.compare(user.password_hash, existingUser.password_hash);
            if (!passwordMatching)
                throw new Error('Invalid Password');
            return existingUser;
        }
        catch (err) {
            err.status = 401;
            throw err;
        }
    }
}
exports.UserServices = UserServices;
