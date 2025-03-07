import dotenv from 'dotenv';
dotenv.config();
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    try {
        const amount = req.body["amount"] as number;
        if (!amount || amount <= 0) {
            throw new Error("Invalid amount");
        }

        var instance = new Razorpay({
            key_id: process.env.RAZORPAY_TEST_KEY,
            key_secret: process.env.RAZORPAY_TEST_KEY_SECRET
        });

        var options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };

        // Using async/await for better error handling
        const order = await new Promise((resolve, reject) => {
            instance.orders.create(options, function (err, order) {
                if (err) {
                    reject(err);
                } else {
                    resolve(order);
                }
            });
        });

        res.json({ order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
}
