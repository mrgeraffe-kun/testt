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

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const wishlistService = req.scope.resolve("wishlistService");
        const result = await wishlistService.getWishlist(email);
        res.json({ message: result });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ error: "Failed to fetch wishlist" });
    }
};
