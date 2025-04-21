import { TransactionBaseService } from "@medusajs/medusa";
import { CartDetails } from "../models/cart-details";

class CartDetailsService extends TransactionBaseService {
    private async findCartByEmail(email: string): Promise<CartDetails | null> {
        const cartsRepo = this.activeManager_.getRepository(CartDetails);
        return cartsRepo.findOne({ where: { email } });
    }

    async getCart(email: string): Promise<string> {
        if (!email) {
            throw new Error("Email is required");
        }

        try {
            const cartExists = await this.findCartByEmail(email);
            if (cartExists) {
                return cartExists.cartId;
            } else {
                return "Cart Search Failed";
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            throw new Error("Failed to fetch cart");
        }
    }

    async create(cartId: string, email: string): Promise<{ success: boolean; message: string }> {
        if (!cartId || !email) {
            throw new Error("Cart ID and email are required");
        }

        try {
            const cartsRepo = this.activeManager_.getRepository(CartDetails);

            const newCartDetail = cartsRepo.create();
            newCartDetail.cartId = cartId;
            newCartDetail.email = email;

            await cartsRepo.save(newCartDetail);

            return { success: true, message: "Cart Saved" };
        } catch (error) {
            console.error("Error creating cart:", error);
            throw new Error("Failed to create cart");
        }
    }

    async deleteCart(email: string): Promise<{ success: boolean; message: string }> {
        if (!email) {
            throw new Error("Email is required");
        }

        try {
            const cartExists = await this.findCartByEmail(email);

            if (cartExists) {
                const cartsRepo = this.activeManager_.getRepository(CartDetails);
                await cartsRepo.delete(cartExists.id);

                return { success: true, message: "Cart Deleted Successfully" };
            } else {
                return { success: false, message: "Cart Not Found" };
            }
        } catch (error) {
            console.error("Error deleting cart:", error);
            throw new Error("Failed to delete cart");
        }
    }
}

export default CartDetailsService;
