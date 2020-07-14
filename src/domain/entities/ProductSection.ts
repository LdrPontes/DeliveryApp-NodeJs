import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { EnterpriseUser } from "./EnterpriseUser";

@Entity({ name: "product_section" })
export class ProductSection {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, length: 255 })
    name: string

    @OneToMany(type => Product, product => product.section)
    products: Product[]


    @ManyToOne(type => EnterpriseUser, enterprise => enterprise.product_sections)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise: EnterpriseUser
}