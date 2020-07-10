import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class EnterpriseUser{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 100})
    name: string;

    @Column({nullable: false, length: 48})
    telephone: string;

    @Column({nullable: false, length: 255})
    email: string;

    @Column({nullable: false})
    password_hash: string;

    @CreateDateColumn()
    created_at: string

    @CreateDateColumn()
    updated_at: string
}