"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const Users_1 = require("../models/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserServices {
    static async create(user) {
        const passwordHash = await bcrypt_1.default.hash(user.password_hash, +process.env.SALT_ROUNDS);
        user.password_hash = passwordHash;
        const newUser = await Users_1.User.InsertUser(user);
    }
}
exports.UserServices = UserServices;
