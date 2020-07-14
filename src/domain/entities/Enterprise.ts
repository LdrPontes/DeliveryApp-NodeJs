import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { EnterpriseUser } from "./EnterpriseUser"

@Entity({ name: 'enterprise' })
export class Enterprise {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({ nullable: true, length: 20 })
    cnpj: string

    @Column({ nullable: true, length: 15 })
    cpf: string

    @Column({ nullable: false })
    logo_url: string

    @OneToOne(type => EnterpriseUser)
    @JoinColumn({ name: "enterprise_id" })
    enterprise_user: EnterpriseUser;
}