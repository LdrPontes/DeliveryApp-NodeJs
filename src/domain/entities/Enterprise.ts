import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { EnterpriseUser } from "./EnterpriseUser"

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
    logo_url: string

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

    @OneToOne(type => EnterpriseUser)
    @JoinColumn({ name: "enterprise_id" })
    enterprise_user: EnterpriseUser;
}