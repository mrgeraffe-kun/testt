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
    const cartService = req.scope.resolve("cartDetailsService")
    let result = await cartService.deleteCart(email);
    res.json({ message: result });
}
