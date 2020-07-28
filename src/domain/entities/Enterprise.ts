import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { EnterpriseUser } from "./EnterpriseUser"
import { Category } from "./Category";

@Entity({ name: 'enterprise' })
export class Enterprise {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({ nullable: false, length: 20 })
    document: string

    @Column({ nullable: false })
    document_type: number //0 - CPF. 1 - CNPJ

    @Column({ nullable: false })
    address: string

    @Column({ nullable: false })
    logo_url: string

    @Column({ nullable: false })
    enterprise_id: number

    @Column({ nullable: false })
    category_id: number
    
    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

    @OneToOne(type => EnterpriseUser)
    @JoinColumn({ name: "enterprise_id" })
    enterprise_user: EnterpriseUser;

    @ManyToOne(type => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;
}