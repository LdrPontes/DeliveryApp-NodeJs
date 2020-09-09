"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _Enterprise = require('./Enterprise');

@Entity({ name: "enterprise_user" })
 class EnterpriseUser {

    PrimaryGeneratedColumn()
    

    Column({ nullable: false, length: 100 })
    

    Column({ nullable: false, length: 48 })
    

    Column({ nullable: false, length: 255, unique: true, })
    

    Column({ nullable: false })
    

    CreateDateColumn()
    

    UpdateDateColumn()
    

    Column({ nullable: true })
    

    OneToOne(type => _Enterprise.Enterprise)
    @JoinColumn({ name: "enterprise_id" })
    

} exports.EnterpriseUser = EnterpriseUser;