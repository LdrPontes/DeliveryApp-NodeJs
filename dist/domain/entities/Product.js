"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _ProductSection = require('./ProductSection');
var _OptionalSection = require('./OptionalSection');
var _Enterprise = require('./Enterprise');

@Entity({ name: "product" })
 class Product {

    PrimaryGeneratedColumn()
    

    Column({ nullable: false, length: 255 })
    

    Column({ nullable: true, length: 255 })
    

    Column({ nullable: true })
    

    Column({ nullable: false, precision: 2, type: "float" })
    

    Column({ nullable: false })
    

    Column({ nullable: false })
    

    ManyToOne(type => _Enterprise.Enterprise, enterprise => enterprise.products)
    @JoinColumn({ name: 'enterprise_id' })
    

    ManyToOne(type => _ProductSection.ProductSection, section => section.products)
    @JoinColumn({ name: "product_section_id" })
    

    ManyToMany(type => _OptionalSection.OptionalSection)
    @JoinTable({name: "product_optional_sections",
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "optional_section_id",
            referencedColumnName: "id"
        }})
    

    CreateDateColumn()
    

    UpdateDateColumn()
    
} exports.Product = Product;