import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class Subscribers extends BaseEntity {

    @PrimaryColumn()
    id: string


    @Column({ type: "varchar" })
    email: string

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "subscriber")
    }
}
