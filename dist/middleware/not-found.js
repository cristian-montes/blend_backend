"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    const err = new Error('Not Found');
    next(err);
};
exports.default = notFound;
