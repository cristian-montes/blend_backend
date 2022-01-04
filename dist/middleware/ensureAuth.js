"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ensureAuth = (req, res, next) => {
    try {
        const { mm_session } = req.cookies;
        // console.log('mm_session', mm_session)
        // console.log("req.user", jwt.verify(mm_session, process.env.APP_SECRET)) //DELETE WHEN NO LONGER NEEDED
        req.user = jsonwebtoken_1.default.verify(mm_session, process.env.APP_SECRET);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = ensureAuth;
