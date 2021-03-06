import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { OptionalSection } from "./OptionalSection";
import { Enterprise } from "./Enterprise";

@Entity({ name: "optional_product" })
export class OptionalProduct {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, precision: 2, type: "float" })
    price: number

    @Column({ nullable: false, length: 255 })
    name: string

    @Column({ nullable: false })
    enterprise_id: number

    @Column({ nullable: false })
    optional_section_id: number
    
    @ManyToOne(type => Enterprise, enterprise => enterprise.optionals)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise: Enterprise

    @ManyToOne(type => OptionalSection, section => section.products)
    @JoinColumn({ name: "optional_section_id" })
    section: OptionalSection;

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}