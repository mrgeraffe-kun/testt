import dotenv from 'dotenv';
dotenv.config();

import {
    type MedusaRequest,
    type MedusaResponse,
} from "@medusajs/medusa";

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const email = req.body["email"];
    const productId = req.body["productId"];

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: "Email is required and must be a string." });
    }
    if (!productId || typeof productId !== 'string') {
        return res.status(400).json({ error: "Product ID is required and must be a string." });
    }

    const wishlistService = req.scope.resolve("wishlistService");

    try {
        const result = await wishlistService.create(productId, email);
        res.json({ success: true, message: result });
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        res.status(500).json({ error: "Failed to add product to wishlist." });
    }
}
