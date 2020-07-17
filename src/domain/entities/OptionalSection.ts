import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { EnterpriseUser } from "./EnterpriseUser";
import { OptionalProduct } from "./OptionalProduct";


@Entity({ name: "optional_section" })
export class OptionalSection {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, length: 255 })
    name: string

    @OneToMany(type => OptionalProduct, product => product.section)
    products: OptionalProduct[]

    @ManyToOne(type => EnterpriseUser, enterprise => enterprise.optional_sections)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise: EnterpriseUser

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}