"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _Category = require('./Category');
var _EnterpriseUser = require('./EnterpriseUser');
var _Product = require('./Product');
var _ProductSection = require('./ProductSection');
var _OptionalProduct = require('./OptionalProduct');
var _OptionalSection = require('./OptionalSection');

@Entity({ name: 'enterprise' })
 class Enterprise {

    PrimaryGeneratedColumn()
    

    Column()
    

    Column({ nullable: false, length: 20, unique: true })
    

    Column({ nullable: false })
     //0 - CPF. 1 - CNPJ

    Column({ nullable: false })
    

    Column({ nullable: false })
    

    Column({ nullable: false })
    

    Column({
        type: 'json',
    })
    

    Column({
        type: 'json',
    })
    

    Column({ nullable: false, unique: true })
    

    Column({ nullable: false })
    

    CreateDateColumn()
    

    UpdateDateColumn()
    

    ManyToOne(type => _Category.Category)
    @JoinColumn({ name: "category_id" })
    

    OneToOne(type => _EnterpriseUser.EnterpriseUser)
    @JoinColumn({ name: "enterprise_user_id" })
    


    OneToMany(type => _Product.Product, product => product.enterprise)
    

    OneToMany(type => _ProductSection.ProductSection, productSection => productSection.enterprise)
    

    OneToMany(type => _OptionalProduct.OptionalProduct, optional => optional.enterprise)
    

    OneToMany(type => _OptionalSection.OptionalSection, optional => optional.enterprise)
    


} exports.Enterprise = Enterprise;