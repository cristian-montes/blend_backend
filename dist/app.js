"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./controllers/auth"));
const transactions_1 = __importDefault(require("./controllers/transactions"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.get('/', async (req, res, next) => {
    try {
        const welcomeMsg = 'Welcome to MoneyMoves Share and get money!';
        res.json(welcomeMsg);
    }
    catch (error) {
        next(error);
    }
});
exports.app.use('/auth', auth_1.default);
exports.app.use('/transactions', transactions_1.default);
