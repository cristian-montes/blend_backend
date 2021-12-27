"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = require("./utils/pool");
const setup_1 = __importDefault(require("./data/setup"));
(0, setup_1.default)(pool_1.pool)
    .catch((err) => console.error(err))
    .finally(() => process.exit());
