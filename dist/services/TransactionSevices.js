"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranssactionServices = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51K9YyABg9yAQBAw8rGSNxfAYWuicQ83S2ZPG1HizU2BHdkhy9IS06NjeBu31HvAiIf2VrhTJIlPUDiAneIWkhDnS00BD8M2sqH', {
    apiVersion: "2020-08-27",
    typescript: true,
});
class TranssactionServices {
}
exports.TranssactionServices = TranssactionServices;
