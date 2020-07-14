import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { EnterpriseUser } from "./EnterpriseUser";
import { OptionalSection } from "./OptionalSection";

@Entity({ name: "optional_product" })
export class OptionalProduct {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, precision: 2, type: "decimal" })
    price: number

    @Column({ nullable: false, length: 255 })
    name: string
    
    @ManyToOne(type => EnterpriseUser, enterprise => enterprise.optionals)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise: EnterpriseUser

    @ManyToOne(type => OptionalSection, section => section.products)
    @JoinColumn({ name: "optional_section_id" })
    section: OptionalSection;
}