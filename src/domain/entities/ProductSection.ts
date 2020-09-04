import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { Enterprise } from "./Enterprise";

@Entity({ name: "product_section" })
export class ProductSection {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, length: 255 })
    name: string

    @Column({ nullable: false })
    enterprise_id: number
    
    @OneToMany(type => Product, product => product.section)
    products: Product[]

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

    @ManyToOne(type => Enterprise, enterprise => enterprise.product_sections)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise: Enterprise
}