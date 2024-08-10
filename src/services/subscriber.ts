import {
    FindConfig,
    Selector,
    TransactionBaseService,
    buildQuery,
} from "@medusajs/medusa"
import { MedusaError } from "@medusajs/utils"
import { Subscribers } from "../models/subscribers"

class SubscriberService extends TransactionBaseService {
    async create(
        email: string,
    ): Promise<String> {
        const subscriberRepo = this.activeManager_.getRepository(
            Subscribers
          )

        const subscriber = await subscriberRepo.findOne({
            where: {
              email: email,
            },
          })
        if (subscriber) {
            return "Subscriber already exists";
        }
        else{
            const subscriberUser = subscriberRepo.create()
            subscriberUser.email = email
            const result = await subscriberRepo.save(subscriberUser)
            return "Subscribed Successfully";
        }
    }

}

export default SubscriberService
