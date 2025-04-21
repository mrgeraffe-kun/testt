import {
    TransactionBaseService
} from "@medusajs/medusa"
import { CouponDetails } from "../models/coupon-details"

class CouponDetailsService extends TransactionBaseService {

    async getCouponDetails(affiliateId: string): Promise<CouponDetails[]> {
        const couponRepo = this.activeManager_.getRepository(CouponDetails);

        try {
            const coupons = await couponRepo.find({ where: { affiliateId } });
            return coupons;
        } catch (error) {
            console.error("Error fetching coupon details:", error);
            throw new Error("Failed to retrieve coupon details.");
        }
    }


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
        newCoupon.amounts = [];

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
        orderId: string,
        amount: number = 0,
        increment: number = 1
    ): Promise<void> {
        const couponRepo = this.activeManager_.getRepository(CouponDetails);

        let coupon = await couponRepo.findOne({
            where: { affiliateId: affiliateId, productHandle: productHandle },
        });

        if (!coupon) {
            throw new Error(`Coupon not found for affiliateId: ${affiliateId} and productHandle: ${productHandle}`);
        }

        coupon.purchases += increment;
        coupon.amount += (amount * 0.15);
        if (!coupon.orderIds) {
            coupon.orderIds = [];
        }
        if (!coupon.amounts) {
            coupon.amounts = [];
        }
        coupon.orderIds.push(orderId);
        coupon.amounts.push(amount);
        await couponRepo.save(coupon);
    }


}

export default CouponDetailsService
