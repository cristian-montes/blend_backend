"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ensureAuth = (req, res, next) => {
    try {
        const { session } = req.cookies;
        console.log('session', session);
        console.log("req.user", jsonwebtoken_1.default.verify(session, process.env.APP_SECRET)); //DELETE WHEN NO LONGER NEEDED
        req.user = jsonwebtoken_1.default.verify(session, process.env.APP_SECRET);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = ensureAuth;
