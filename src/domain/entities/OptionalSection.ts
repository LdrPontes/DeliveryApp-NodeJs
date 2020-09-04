import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { OptionalProduct } from "./OptionalProduct";
import { Enterprise } from "./Enterprise";


@Entity({ name: "optional_section" })
export class OptionalSection {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, length: 255 })
    name: string

    @Column({ default: 0 })
    min: number

    @Column({ default: 50 })
    max: number

    @OneToMany(type => OptionalProduct, product => product.section)
    products: OptionalProduct[]

    @Column({ nullable: false })
    enterprise_id: number
    
    @ManyToOne(type => Enterprise, enterprise => enterprise.optional_sections)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise: Enterprise

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}