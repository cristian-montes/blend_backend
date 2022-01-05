import { Transaction } from "../models/Transactions";
import Stripe from "stripe";
import { User } from "../models/Users";
import { response } from "express";

const stripe = new Stripe('sk_test_51K9YyABg9yAQBAw8rGSNxfAYWuicQ83S2ZPG1HizU2BHdkhy9IS06NjeBu31HvAiIf2VrhTJIlPUDiAneIWkhDnS00BD8M2sqH',{
    apiVersion:"2020-08-27",
    typescript: true,
});


//*******Example to add your live.test keys for production purposes */
// const stripe = new Stripe(process.env.STRIPE_KEY, {
//     apiVersion:"2020-08-27",
//     typescript: true,
// });


export class TransactionServices{
    static async createTransaction(transaction:{       
        sender_id: number;
        recipient_id: number;
        amount: number; 
        payment_method_id: string;
        }){

        const recipient: User = await User.findById(transaction.recipient_id);
        const convertedAmount = transaction.amount/100
        
        // **** to transfer ****//
        
        const params: Stripe.PaymentIntentCreateParams = {
          payment_method_types: ['card'],
          payment_method: transaction.payment_method_id,
          amount: transaction.amount,
          currency: 'usd',
          transfer_data: {
            destination: recipient.connected_acct_id
          }
        };

        const response = await stripe.paymentIntents.create(params)

        const payment_intent_id = response.id;

         // **** to transfer ****//

        const setTransaction = await Transaction.insertTransaction({
            sender_id:transaction.sender_id,
            recipient_id: transaction.recipient_id,
            payment_intent_id: payment_intent_id,
            amount: convertedAmount,
            payment_confirmed: true,
         })

         return {...setTransaction.row, client_secret:response.client_secret}
    }


}