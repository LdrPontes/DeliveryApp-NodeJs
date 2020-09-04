import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
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

    @OneToOne(type => Enterprise)
    @JoinColumn({ name: "enterprise_id" })
    enterprise: Enterprise;

}