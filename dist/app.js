"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./controllers/auth"));
const transactions_1 = __importDefault(require("./controllers/transactions"));
const error_1 = __importDefault(require("./middleware/error"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.get('/', async (req, res, next) => {
    try {
        const welcomeMsg = 'Welcome to MoneyMoves Share and Recieve money!';
        res.json(welcomeMsg);
    }
    catch (error) {
        next(error);
    }
});
exports.app.use('/auth', auth_1.default);
exports.app.use('/transactions', transactions_1.default);
exports.app.use(error_1.default);
exports.app.use(not_found_1.default);
