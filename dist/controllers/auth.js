"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserServices_1 = require("../services/UserServices");
// const attachCookie =(res:Response, theUser:any) => {
//     res.cookie('session', theUser.authToke(),{
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24,
//     })
// }
const authentication = (0, express_1.Router)();
authentication.post('/signup', async (req, res, next) => {
    try {
        const newUser = await UserServices_1.UserServices.create(req.body);
        // attachCookie(res, newUser);
        const galleta = res.cookie('session', newUser.authToken(), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: 'none',
            secure: true
        });
        console.log('GALLETA', galleta);
        res.send(newUser);
    }
    catch (error) {
        next(error);
    }
});
authentication.post('/signin', async (req, res, next) => {
    try {
        const existingUser = await UserServices_1.UserServices.authorize(req.body);
        // attachCookie(res, existingUser);
        const galleta = res.cookie('session', existingUser.authToken(), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: 'none',
            secure: true
        });
        console.log('GALLETA', galleta);
        res.send(existingUser);
    }
    catch (error) {
        next(error);
    }
});
authentication.get('/logout', async (req, res, next) => {
    try {
        res.clearCookie('session', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        res.send('Sad to see you not do more money moves for now :(');
    }
    catch (error) {
        next(error);
    }
});
exports.default = authentication;
