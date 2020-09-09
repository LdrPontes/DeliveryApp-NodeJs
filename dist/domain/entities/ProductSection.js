"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _Product = require('./Product');
var _Enterprise = require('./Enterprise');

@Entity({ name: "product_section" })
 class ProductSection {

    PrimaryGeneratedColumn()
    

    Column({ nullable: false, length: 255 })
    

    Column({ nullable: false })
    
    
    OneToMany(type => _Product.Product, product => product.section)
    

    CreateDateColumn()
    

    UpdateDateColumn()
    

    ManyToOne(type => _Enterprise.Enterprise, enterprise => enterprise.product_sections)
    @JoinColumn({ name: 'enterprise_id' })
    
} exports.ProductSection = ProductSection;