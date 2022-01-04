import { Transaction } from "../models/Transactions";
import Stripe from "stripe";
import { User } from "../models/Users";

// const stripe = new Stripe('sk_test_51K9YyABg9yAQBAw8rGSNxfAYWuicQ83S2ZPG1HizU2BHdkhy9IS06NjeBu31HvAiIf2VrhTJIlPUDiAneIWkhDnS00BD8M2sqH',{
//     apiVersion:"2020-08-27",
//     typescript: true,
// });

const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion:"2020-08-27",
    typescript: true,
});


export class TransactionServices{
    static async createTransaction(transaction:{       
        sender_id: number;
        recipient_id: number;
        amount: number; 
        }):Promise<Transaction>{

        const recipient: User = await User.findById(transaction.recipient_id);
        const convertedAmount = transaction.amount/100
        
        // **** to transfer ****//
        // const params: Stripe.PaymentIntentCreateParams = {
        //     amount: transaction.amount,
        //     currency: 'usd',
        //     payment_method_types: ['card'],
        //     transfer_data: {
        //         destination: recipient.connected_acct_id
        //     }
        //   };

        const params: Stripe.PaymentIntentCreateParams = {
            amount: transaction.amount,
            currency: 'usd',
            payment_method_types: ['card']
          };

        const resposnse = await stripe.paymentIntents.create(params,{
            stripeAccount: recipient.connected_acct_id
          })

        const payment_intent_id = resposnse.id;

        const setTransaction = await Transaction.insertTransaction({
            sender_id:transaction.sender_id,
            recipient_id: transaction.recipient_id,
            payment_intent_id: payment_intent_id,
            amount: convertedAmount,
            payment_confirmed: false,
         })

         return setTransaction;
    }


}