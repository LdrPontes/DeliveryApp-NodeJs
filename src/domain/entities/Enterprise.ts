import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { EnterpriseUser } from "./EnterpriseUser";
import { Product } from "./Product";
import { ProductSection } from "./ProductSection";
import { OptionalProduct } from "./OptionalProduct";
import { OptionalSection } from "./OptionalSection";

@Entity({ name: 'enterprise' })
export class Enterprise {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({ nullable: false, length: 20, unique: true })
    document: string

    @Column({ nullable: false })
    document_type: number //0 - CPF. 1 - CNPJ

    @Column({ nullable: false })
    address: string

    @Column({ nullable: false })
    logo_url: string

    @Column({ nullable: false })
    category_id: number

    @Column({
        type: 'json',
    })
    settings: string

    @Column({ nullable: false, unique: true })
    code: string

    @Column({ nullable: false })
    enterprise_user_id: number

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

    @ManyToOne(type => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @OneToOne(type => EnterpriseUser)
    @JoinColumn({ name: "enterprise_user_id" })
    user: EnterpriseUser;


    @OneToMany(type => Product, product => product.enterprise)
    products: Product[]

    @OneToMany(type => ProductSection, productSection => productSection.enterprise)
    product_sections: ProductSection[]

    @OneToMany(type => OptionalProduct, optional => optional.enterprise)
    optionals: OptionalProduct[]

    @OneToMany(type => OptionalSection, optional => optional.enterprise)
    optional_sections: OptionalSection[]


}