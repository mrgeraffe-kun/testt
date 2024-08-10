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
            const name = req.body["name"];
            console.log(`Sending signup email to ${name}`);
            await sgMail.send({
                templateId: process.env.SENDGRID_SIGN_UP_ID || "",
                from: process.env.SENDGRID_FROM || "",
                to: email,
                dynamicTemplateData: {
                    name: name,
                }
            });
            console.log(`Sent signup email to ${name}`);
            res.json({ message: "Signup email sent successfully"});
}
