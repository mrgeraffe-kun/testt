import {
    TransactionBaseService
} from "@medusajs/medusa"
import { CouponDetails } from "../models/coupon-details"

class CouponDetailsService extends TransactionBaseService {

    async create(
        affiliateId: string,
        productHandle: string,
    ): Promise<string> {
        const couponRepo = this.activeManager_.getRepository(CouponDetails);

        let coupons = await couponRepo.findOne({
            where: { affiliateId: affiliateId, productHandle: productHandle },
        });

        if (coupons) {
            return coupons.affiliateId;
        }

        const newCoupon = new CouponDetails(); // Assuming CouponDetails has a constructor

        newCoupon.affiliateId = affiliateId;
        newCoupon.productHandle = productHandle;
        newCoupon.visits = 0;
        newCoupon.purchases = 0;
        newCoupon.amount = 0;
        newCoupon.orderIds = [];

        await couponRepo.save(newCoupon);
        return newCoupon.affiliateId;
    }

    async updateVisits(
        affiliateId: string,
        productHandle: string,
        increment: number = 1,
    ): Promise<void> {
        const couponRepo = this.activeManager_.getRepository(CouponDetails);

        let coupon = await couponRepo.findOne({
            where: { affiliateId: affiliateId, productHandle: productHandle },
        });

        if (!coupon) {
            throw new Error(`Coupon not found for affiliateId: ${affiliateId} and productHandle: ${productHandle}`);
        }

        coupon.visits += increment;
        await couponRepo.save(coupon);
    }

    async updatePurchases(
        affiliateId: string,
        productHandle: string,
        increment: number = 1,
        amount: number = 0,
        orderId: string
    ): Promise<void> {
        const couponRepo = this.activeManager_.getRepository(CouponDetails);

        let coupon = await couponRepo.findOne({
            where: { affiliateId: affiliateId, productHandle: productHandle },
        });

        if (!coupon) {
            throw new Error(`Coupon not found for affiliateId: ${affiliateId} and productHandle: ${productHandle}`);
        }

        coupon.purchases += increment;
        coupon.amount += amount;
        if (!coupon.orderIds) {
            coupon.orderIds = [];
        }
        coupon.orderIds.push(orderId);
        await couponRepo.save(coupon);
    }


}

export default CouponDetailsService
