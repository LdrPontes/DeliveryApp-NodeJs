"use strict";Object.defineProperty(exports, "__esModule", {value: true});

@Entity({name: 'category'})
 class Category {
    
    PrimaryGeneratedColumn()
    

    Column({ nullable: false, length: 100 })
    
    
} exports.Category = Category;