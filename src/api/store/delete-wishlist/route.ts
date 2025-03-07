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
    const productId = req.body["productId"];
    const wishlistService = req.scope.resolve("wishlistService")
    let result = await wishlistService.removeProduct(productId, email);
    res.json({ message: result });
}
