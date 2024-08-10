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
import axios from 'axios';

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
    const pincode = req.body["pincode"];
    const grams = req.body["grams"];
    const mode = req.body["mode"];
    const status = "Delivered";
    const origin = 500088;

    const url = `https://track.delhivery.com/api/kinko/v1/invoice/charges/.json?md=${mode}&ss=${status}&d_pin=${pincode}&o_pin=${origin}&cgm=${grams}`;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${process.env.DELHIVERY_TOKEN}` // Replace with your actual token
        }
    };

    axios.get(url, options)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        });
}
