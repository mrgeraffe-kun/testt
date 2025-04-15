import dotenv from 'dotenv'
dotenv.config()

import {
    type MedusaRequest,
    type MedusaResponse,
} from "@medusajs/medusa"

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    try {
        const email = req.body["email"];
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const affiliateService = req.scope.resolve("affiliateService")
        const result = await affiliateService.create(email);
        return res.json({ message: result });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create affiliate",
            error: error.message
        });
    }
}
