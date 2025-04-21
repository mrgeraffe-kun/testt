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

    // Input validation
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Email is required and must be a string." });
    }

    const wishlistService = req.scope.resolve("wishlistService");

    try {
        const result = await wishlistService.removeAllProducts(email);
        res.json({ success: true, message: result });
    } catch (error) {
        console.error("Error removing products from wishlist:", error);
        res.status(500).json({ error: "Failed to remove products from wishlist." });
    }
}
