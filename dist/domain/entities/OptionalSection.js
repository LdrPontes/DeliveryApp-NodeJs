"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _OptionalProduct = require('./OptionalProduct');
var _Enterprise = require('./Enterprise');


@Entity({ name: "optional_section" })
 class OptionalSection {

    PrimaryGeneratedColumn()
    

    Column({ nullable: false, length: 255 })
    

    Column({ default: 0 })
    

    Column({ default: 50 })
    

    OneToMany(type => _OptionalProduct.OptionalProduct, product => product.section)
    

    Column({ nullable: false })
    
    
    ManyToOne(type => _Enterprise.Enterprise, enterprise => enterprise.optional_sections)
    @JoinColumn({ name: 'enterprise_id' })
    

    CreateDateColumn()
    

    UpdateDateColumn()
    
} exports.OptionalSection = OptionalSection;