"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserServices_1 = require("../services/UserServices");
const authentication = (0, express_1.Router)();
authentication.post('/signup', async (req, res, next) => {
    try {
        const newUser = await UserServices_1.UserServices.create(req.body);
        res.cookie('mm_session', newUser.authToken(), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: !!process.env.SECURE_COOKIES ? 'none' : 'lax',
            secure: !!process.env.SECURE_COOKIES
        });
        res.send(newUser);
    }
    catch (error) {
        next(error);
    }
});
authentication.post('/signin', async (req, res, next) => {
    try {
        const existingUser = await UserServices_1.UserServices.authorize(req.body);
        res.cookie('mm_session', existingUser.authToken(), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: !!process.env.SECURE_COOKIES ? 'none' : 'lax',
            secure: !!process.env.SECURE_COOKIES
        });
        res.send(existingUser);
    }
    catch (error) {
        next(error);
    }
});
authentication.get('/logout', async (req, res, next) => {
    try {
        res.clearCookie('mm_session', {
            httpOnly: true,
            sameSite: !!process.env.SECURE_COOKIES ? 'none' : 'lax',
            secure: !!process.env.SECURE_COOKIES
        });
        res.send('Sad to see you not do more money moves for now :(');
    }
    catch (error) {
        next(error);
    }
});
exports.default = authentication;
