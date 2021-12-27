"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ensureAuth = (req, res, next) => {
    try {
        const userData = req.cookies;
        const user = jsonwebtoken_1.default.verify(userData.session, process.env.APP_SECRET);
        // req.user = user --> LOOK AT THIS OBJECT WHEN CREATED TO GRAB THE RIGHT KEY
    }
    catch (error) {
        next(error);
    }
};
exports.default = ensureAuth;
