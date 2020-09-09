"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseUser = void 0;
var typeorm_1 = require("typeorm");
var Enterprise_1 = require("./Enterprise");
var EnterpriseUser = /** @class */ (function () {
    function EnterpriseUser() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], EnterpriseUser.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, length: 100 }),
        __metadata("design:type", String)
    ], EnterpriseUser.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, length: 48 }),
        __metadata("design:type", String)
    ], EnterpriseUser.prototype, "telephone", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, length: 255, unique: true, }),
        __metadata("design:type", String)
    ], EnterpriseUser.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false }),
        __metadata("design:type", String)
    ], EnterpriseUser.prototype, "password_hash", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], EnterpriseUser.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], EnterpriseUser.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], EnterpriseUser.prototype, "enterprise_id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Enterprise_1.Enterprise; }),
        typeorm_1.JoinColumn({ name: "enterprise_id" }),
        __metadata("design:type", Enterprise_1.Enterprise)
    ], EnterpriseUser.prototype, "enterprise", void 0);
    EnterpriseUser = __decorate([
        typeorm_1.Entity({ name: "enterprise_user" })
    ], EnterpriseUser);
    return EnterpriseUser;
}());
exports.EnterpriseUser = EnterpriseUser;
//# sourceMappingURL=EnterpriseUser.js.map