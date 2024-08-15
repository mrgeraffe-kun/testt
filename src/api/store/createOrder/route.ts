import dotenv from 'dotenv'
dotenv.config()
import sgMail from '@sendgrid/mail';
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
    const amount = req.body["amount"];
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_TEST_KEY, key_secret: process.env.RAZORPAY_TEST_KEY_SECRET })

    var options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
        res.json({ order });
    });
}
