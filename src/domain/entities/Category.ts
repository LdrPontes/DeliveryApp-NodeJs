import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'category'})
export class Category {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100 })
    name: string;
    
}