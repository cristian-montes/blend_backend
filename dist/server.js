"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const pool_1 = require("./utils/pool");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT) || 7890;
app_1.app.listen(PORT, () => {
    console.log(`Started on ${PORT}`);
    // console.log('salt_rounds is', typeof(+process.env.SALT_ROUNDS));
    process.on('exit', () => {
        console.log('Goodbye!');
        pool_1.pool.end();
    });
});
