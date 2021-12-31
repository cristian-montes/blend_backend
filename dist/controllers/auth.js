"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserServices_1 = require("../services/UserServices");
const attachCookie = (res, theUser) => {
    res.cookie('session', theUser.authToken(), {
        // httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2,
    });
};
const authentication = (0, express_1.Router)();
authentication.post('/signup', async (req, res, next) => {
    try {
        const newUser = await UserServices_1.UserServices.create(req.body);
        attachCookie(res, newUser);
        res.send(newUser);
    }
    catch (error) {
        next(error);
    }
});
authentication.post('/signin', async (req, res, next) => {
    try {
        const existingUser = await UserServices_1.UserServices.authorize(req.body);
        attachCookie(res, existingUser);
        res.send(existingUser);
    }
    catch (error) {
        next(error);
    }
});
authentication.get('/logout', async (req, res, next) => {
    try {
        res.clearCookie('session', {
            httpOnly: true
        });
        res.send('Sad to see you not do more money moves for now :(');
    }
    catch (error) {
        next(error);
    }
});
exports.default = authentication;
