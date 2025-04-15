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
    const email = req.body["email"];
    const wishlistService = req.scope.resolve("affiliateService")
    let result = await wishlistService.getAffiliate(email);
    res.json({ message: result });
}
