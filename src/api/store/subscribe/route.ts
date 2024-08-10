import dotenv from 'dotenv'
dotenv.config()
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

import {
    type MedusaRequest,
    type MedusaResponse,
} from "@medusajs/medusa"

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
    const email = req.body["email"];
    const subscriberService = req.scope.resolve("subscriberService")
    let result = await subscriberService.create(email);
    if(result == "Subscribed Successfully"){
        await sgMail.send({
            templateId: process.env.SENDGRID_SUBSCRIBE_ID || "",
            from: process.env.SENDGRID_FROM || "",
            to: email,
            dynamicTemplateData: {
            }
        });
    }
    res.json({ message: result });
}
