"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserServices_1 = require("../services/UserServices");
const authentication = (0, express_1.Router)();
authentication.post('/signup', async (req, res, next) => {
    try {
        const newUser = await UserServices_1.UserServices.create(req.body);
        res.send(newUser);
    }
    catch (error) {
        next(error);
    }
});
authentication.post('/signin', async (req, res, next) => {
    try {
        const existingUser = await UserServices_1.UserServices.authorize(req.body);
        res.send(existingUser);
    }
    catch (error) {
        next(error);
    }
});
exports.default = authentication;
