import { Transaction } from "../models/Transactions";
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51K9YyABg9yAQBAw8rGSNxfAYWuicQ83S2ZPG1HizU2BHdkhy9IS06NjeBu31HvAiIf2VrhTJIlPUDiAneIWkhDnS00BD8M2sqH',{
    apiVersion:"2020-08-27",
    typescript: true,
});



export class TranssactionServices{

}