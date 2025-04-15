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
        const affiliateId = req.body["affiliateId"];
        const productHandle = req.body["productHandle"];

        const couponDetailsService = req.scope.resolve("couponDetailsService")
        const result = await couponDetailsService.create(affiliateId, productHandle);
        return res.json({ message: result });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create affiliate",
            error: error.message
        });
    }
}
