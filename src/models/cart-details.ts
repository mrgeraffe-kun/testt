import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm"

@Entity()
export class CartDetails extends BaseEntity {

    @PrimaryColumn()
    id: string


    @Column({ type: "varchar" })
    email: string

    @Column({ type: "varchar" })
    cartId: string

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "cart_details")
    }
}
