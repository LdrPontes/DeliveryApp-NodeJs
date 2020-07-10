import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class EnterpriseUser{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 100})
    name: string;

    @Column({nullable: false, length: 48})
    telephone: string;

    @Column({nullable: false, length: 255, unique: true,})
    email: string;

    @Column({nullable: false})
    password_hash: string;

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}