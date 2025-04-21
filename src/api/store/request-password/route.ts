import dotenv from 'dotenv';
dotenv.config();
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import {
    type MedusaRequest,
    type MedusaResponse,
} from "@medusajs/medusa";

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const email = req.body["email"];
    const code = req.body["code"];

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Email is required and must be a string." });
    }

    const customerService = req.scope.resolve("customerService");

    try {
        const customerData = await customerService.retrieveByEmail(email);
        const resetTokenData = await customerService.generateResetPasswordToken(customerData.id);
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
        res.json({ message: "Password reset email sent successfully", code: resetTokenData });
    } catch (error) {
        console.error("Error during password reset process:", error);
        res.status(500).json({ error: "Failed to send password reset email." });
    }
};
