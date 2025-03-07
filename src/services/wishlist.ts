import {
    TransactionBaseService
} from "@medusajs/medusa"
import { Wishlist } from "../models/wishlist"

class WishlistService extends TransactionBaseService {
    async getWishlist(
        email: string,
    ): Promise<String[]> {
        const wishlistRepo = this.activeManager_.getRepository(
            Wishlist
          )

        const wishlist = await wishlistRepo.findOne({
            where: {
              email: email,
            },
          })
        if (wishlist) {
            return wishlist.productIds;
        }
        else{
            return [];
        }
    }

    async create(productId: string, email: string): Promise<string[]> {
        const wishlistRepo = this.activeManager_.getRepository(Wishlist);

        // Find existing wishlist for the email
        let wishlist = await wishlistRepo.findOne({
            where: { email },
        });

        // If wishlist does not exist, create a new one
        if (!wishlist) {
            wishlist = new Wishlist();
            wishlist.email = email;
            wishlist.productIds = [];
        }

        // Ensure unique product IDs using a Set
        const uniqueProductIds = new Set([...wishlist.productIds, productId]);
        wishlist.productIds = Array.from(uniqueProductIds);

        // Save the updated wishlist
        await wishlistRepo.save(wishlist);

        return wishlist.productIds;
    }

    async removeProduct(productId: string, email: string): Promise<String[]> {
        const wishlistRepo = this.activeManager_.getRepository(Wishlist);

        const wishlist = await wishlistRepo.findOne({
            where: {
                email: email,
            },
        });

        if (wishlist) {
            wishlist.productIds = wishlist.productIds.filter(
                (id) => id !== productId
            );

            await wishlistRepo.save(wishlist);
            return wishlist.productIds;
        } else {
            return [];
        }
    }

    async removeAllProducts(email: string): Promise<string[]> {
        const wishlistRepo = this.activeManager_.getRepository(Wishlist);

        const wishlist = await wishlistRepo.findOne({
            where: {
                email: email,
            },
        });

        if (wishlist) {
            wishlist.productIds = [];

            await wishlistRepo.save(wishlist);
            return wishlist.productIds;
        } else {
            return [];
        }
    }



}

export default WishlistService
