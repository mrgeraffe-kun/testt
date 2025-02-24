import {
    TransactionBaseService
} from "@medusajs/medusa"
import { CartDetails } from "../models/cart-details"

class CartDetailsService extends TransactionBaseService {
    async getCart(
        email: string,
    ): Promise<String> {
        const cartsRepo = this.activeManager_.getRepository(
            CartDetails
          )

        const cartExists = await cartsRepo.findOne({
            where: {
              email: email,
            },
          })
        if (cartExists) {
            return cartExists.cartId;
        }
        else{
            return "Cart Search Failed";
        }
    }

    async create(
        cartId: string,
        email: string
    ): Promise<String> {
        const cartsRepo = this.activeManager_.getRepository(
            CartDetails
          )

          const newCartDetail = cartsRepo.create();
          newCartDetail.cartId = cartId;
          newCartDetail.email = email;
          cartsRepo.save(newCartDetail);
          return "Cart Saved";
    }

}

export default CartDetailsService
