import { PrimaryGeneratedColumn, Column, ManyToOne, Entity, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, RelationId } from "typeorm";
import { ProductSection } from "./ProductSection";
import { OptionalSection } from "./OptionalSection";
import { Enterprise } from "./Enterprise";

@Entity({ name: "product" })
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 255 })
    title: string

    @Column({ nullable: true, length: 255 })
    description: string

    @Column({ nullable: true })
    img_url: string

    @Column({ nullable: false, precision: 2, type: "float" })
    price: number

    @Column({ nullable: false })
    enterprise_id: number

    @Column({ nullable: false })
    product_section_id: number

    @ManyToOne(type => Enterprise, enterprise => enterprise.products)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise: Enterprise

    @ManyToOne(type => ProductSection, section => section.products)
    @JoinColumn({ name: "product_section_id" })
    section: ProductSection;

    @ManyToMany(type => OptionalSection)
    @JoinTable({name: "product_optional_sections",
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "optional_section_id",
            referencedColumnName: "id"
        }})
    optional_sections: OptionalSection[];

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}