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
    const customerService = req.scope.resolve("customerService");
    customerService.retrieveByEmail(req.body["email"]).then((data: any) => {
        customerService.generateResetPasswordToken(data["id"]).then(async (data) => {
            const email = req.body["email"];
            const code = req.body["code"];
            console.log(`Sending password reset email with token to: ${email}`);
            await sgMail.send({
                templateId: process.env.SENDGRID_PASSWORD_RESET_ID || "",
                from: process.env.SENDGRID_FROM || "",
                to: email,
                dynamicTemplateData: {
                    verificationCode: code.toString(),
                }
            });
            console.log(`Successfully sent password reset email with token to: ${email}`);
            res.json({ message: "Password reset email sent successfully", code: data });
        })
            .catch((err) => {
                console.log(err);
            })
    }).catch((err) => {
        res.send(500);
    })
}
