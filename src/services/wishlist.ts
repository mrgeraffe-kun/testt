import {
    TransactionBaseService
} from "@medusajs/medusa"
import { Wishlist } from "../models/wishlist"
class WishlistService extends TransactionBaseService {
    async getWishlist(email: string): Promise<string[]> {
        const wishlistRepo = this.activeManager_.getRepository(Wishlist);
        const wishlist = await wishlistRepo.findOne({ where: { email } });
        return wishlist ? wishlist.productIds : [];
    }

    async create(productId: string, email: string): Promise<string[]> {
        if (!productId || !email) {
            throw new Error("Product ID and email are required");
        }

        const wishlistRepo = this.activeManager_.getRepository(Wishlist);
        let wishlist = await wishlistRepo.findOne({ where: { email } });

        if (!wishlist) {
            wishlist = wishlistRepo.create({ email, productIds: [] });
        }

        wishlist.productIds = Array.from(new Set([...wishlist.productIds, productId]));
        await wishlistRepo.save(wishlist);

        return wishlist.productIds;
    }

    async removeProduct(productId: string, email: string): Promise<string[]> {
        if (!productId || !email) {
            throw new Error("Product ID and email are required");
        }

        const wishlistRepo = this.activeManager_.getRepository(Wishlist);
        const wishlist = await wishlistRepo.findOne({ where: { email } });

        if (wishlist) {
            wishlist.productIds = wishlist.productIds.filter((id) => id !== productId);
            await wishlistRepo.save(wishlist);
        }

        return wishlist ? wishlist.productIds : [];
    }

    async removeAllProducts(email: string): Promise<string[]> {
        if (!email) {
            throw new Error("Email is required");
        }

        const wishlistRepo = this.activeManager_.getRepository(Wishlist);
        const wishlist = await wishlistRepo.findOne({ where: { email } });

        if (wishlist) {
            wishlist.productIds = [];
            await wishlistRepo.save(wishlist);
        }

        return wishlist ? wishlist.productIds : [];
    }
}

export default WishlistService
