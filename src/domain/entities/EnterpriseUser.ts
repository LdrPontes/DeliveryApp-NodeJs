import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { ProductSection } from "./ProductSection";
import { OptionalProduct } from "./OptionalProduct";
import { OptionalSection } from "./OptionalSection";
import { Enterprise } from "./Enterprise";

@Entity({ name: "enterprise_user" })
export class EnterpriseUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100 })
    name: string;

    @Column({ nullable: false, length: 48 })
    telephone: string;

    @Column({ nullable: false, length: 255, unique: true, })
    email: string;

    @Column({ nullable: false })
    password_hash: string;

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

    @Column({ nullable: true })
    enterprise_id: number

    @OneToMany(type => Product, product => product.enterprise)
    products: Product[]

    @OneToMany(type => ProductSection, productSection => productSection.enterprise)
    product_sections: ProductSection[]

    @OneToMany(type => OptionalProduct, optional => optional.enterprise)
    optionals: OptionalProduct[]

    @OneToMany(type => OptionalSection, optional => optional.enterprise)
    optional_sections: OptionalSection[]

    @OneToOne(type => Enterprise)
    @JoinColumn({ name: "enterprise_id" })
    enterprise: Enterprise;

}