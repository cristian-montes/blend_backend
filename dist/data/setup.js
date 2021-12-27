"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const promises_1 = __importDefault(require("fs/promises"));
module.exports = (pool) => {
    return promises_1.default
        .readFile('sql/setup.sql', { encoding: 'utf-8' })
        .then((sql) => pool.query(sql));
};
