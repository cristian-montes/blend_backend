"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserServices_1 = require("../services/UserServices");
const authentication = (0, express_1.Router)();
authentication.post('/signup', async (req, res, next) => {
    try {
        console.log('body', req.body);
        const newUser = await UserServices_1.UserServices.create(req.body);
        res.send(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.default = authentication;
