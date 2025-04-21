import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class CouponDetails extends BaseEntity {

    @PrimaryColumn()
    id: string

    @Column({ type: "varchar" })
    affiliateId: string

    @Column({ type: "varchar" })
    productHandle: string

    @Column({ type: "int" })
    visits: number

    @Column({ type: "int" })
    purchases: number

    @Column({ type: "float" })
    amount: number

    @Column({ type: "simple-array" })
    orderIds: string[]

    @Column({ type: "simple-array" })
    amounts: number[]

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "coupon-details")
    }
}
