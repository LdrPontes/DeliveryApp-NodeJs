"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _OptionalSection = require('./OptionalSection');
var _Enterprise = require('./Enterprise');

@Entity({ name: "optional_product" })
 class OptionalProduct {

    PrimaryGeneratedColumn()
    

    Column({ nullable: false, precision: 2, type: "float" })
    

    Column({ nullable: false, length: 255 })
    

    Column({ nullable: false })
    

    Column({ nullable: false })
    
    
    ManyToOne(type => _Enterprise.Enterprise, enterprise => enterprise.optionals)
    @JoinColumn({ name: 'enterprise_id' })
    

    ManyToOne(type => _OptionalSection.OptionalSection, section => section.products)
    @JoinColumn({ name: "optional_section_id" })
    

    CreateDateColumn()
    

    UpdateDateColumn()
    
} exports.OptionalProduct = OptionalProduct;