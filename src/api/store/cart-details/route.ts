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
    try {
        let result = await cartService.getCart(email);
        res.json({ message: result });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
}
