import dotenv from 'dotenv'
dotenv.config()
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

import {
    type MedusaRequest,
    type MedusaResponse,
} from "@medusajs/medusa"
import Razorpay from 'razorpay';

export const GET = (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    res.json({
        message: "[GET] Hello world!",
    })
}

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const signature = req.body["razorpay_signature"];
    const orderId = req.body["razorpay_order_id"];
    const paymentId = req.body["razorpay_payment_id"];
    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_TEST_KEY_SECRET);
    sha.update(`${orderId}|${paymentId}`);
    const digest = sha.digest('hex');
    console.log(digest);
    console.log(signature);
    if(digest === signature){
        res.status(200).json({ message: "Payment Valid" });
    }
    else{
        res.status(400).json({ message: "Payment Invalid" });
    }
}
