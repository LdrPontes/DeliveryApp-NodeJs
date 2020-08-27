import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { EnterpriseSettings } from "./EnterpriseSettings";

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

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

    @ManyToOne(type => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;



}