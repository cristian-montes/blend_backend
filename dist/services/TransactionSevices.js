"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionServices = void 0;
const Transactions_1 = require("../models/Transactions");
const stripe_1 = __importDefault(require("stripe"));
const Users_1 = require("../models/Users");
// const stripe = new Stripe('sk_test_51K9YyABg9yAQBAw8rGSNxfAYWuicQ83S2ZPG1HizU2BHdkhy9IS06NjeBu31HvAiIf2VrhTJIlPUDiAneIWkhDnS00BD8M2sqH',{
//     apiVersion:"2020-08-27",
//     typescript: true,
// });
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2020-08-27",
    typescript: true,
});
class TransactionServices {
    static async createTransaction(transaction) {
        const recipient = await Users_1.User.findById(transaction.recipient_id);
        const convertedAmount = transaction.amount / 100;
        const params = {
            amount: transaction.amount,
            currency: 'usd',
            payment_method_types: ['card'],
            transfer_data: {
                destination: recipient.connected_acct_id
            }
        };
        const resposnse = await stripe.paymentIntents.create(params);
        const payment_intent_id = resposnse.id;
        const setTransaction = await Transactions_1.Transaction.insertTransaction({
            sender_id: transaction.sender_id,
            recipient_id: transaction.recipient_id,
            payment_intent_id: payment_intent_id,
            amount: convertedAmount,
            payment_confirmed: false,
        });
        return setTransaction;
    }
}
exports.TransactionServices = TransactionServices;
