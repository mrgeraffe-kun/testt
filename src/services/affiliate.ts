import {
    FindConfig,
    Selector,
    TransactionBaseService,
    buildQuery,
} from "@medusajs/medusa"
import { MedusaError } from "@medusajs/utils"
import { Affiliates } from "../models/affiliate"

class AffiliateService extends TransactionBaseService {
    async create(
        email: string,
    ): Promise<String> {
        try {
            if (!email) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    "Email is required"
                )
            }

            const affiliateRepo = this.activeManager_.getRepository(
                Affiliates
            )

            const existingAffiliate = await affiliateRepo.findOne({
                where: { email }
            })

            if (existingAffiliate) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    "Subscriber already exists"
                )
            }

            const newAffiliate = affiliateRepo.create({ email })
            await affiliateRepo.save(newAffiliate)
            return "Subscribed Successfully"
        } catch (error) {
            throw error
        }
    }

    async getAffiliate(
        email: string,
    ): Promise<any> {
        try {
            if (!email) {
                throw new MedusaError(
                    MedusaError.Types.INVALID_DATA,
                    "Email is required"
                )
            }

            const affiliateRepo = this.activeManager_.getRepository(
                Affiliates
            )

            const affiliate = await affiliateRepo.findOne({
                where: { email }
            })

            if (!affiliate) {
                throw new MedusaError(
                    MedusaError.Types.NOT_FOUND,
                    "Invalid affiliate"
                )
            }

            return affiliate
        } catch (error) {
            throw error
        }
    }
}

export default AffiliateService
