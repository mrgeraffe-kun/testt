import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm"

@Entity()
export class Wishlist extends BaseEntity {

    @PrimaryColumn()
    id: string


    @Column({ type: "varchar" })
    email: string

    @Column({ type: "simple-array" })
    productIds: string[]

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "wishlist")
    }
}
