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
exports.Enterprise = void 0;
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var EnterpriseUser_1 = require("./EnterpriseUser");
var Product_1 = require("./Product");
var ProductSection_1 = require("./ProductSection");
var OptionalProduct_1 = require("./OptionalProduct");
var OptionalSection_1 = require("./OptionalSection");
var Enterprise = /** @class */ (function () {
    function Enterprise() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Enterprise.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Enterprise.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, length: 20, unique: true }),
        __metadata("design:type", String)
    ], Enterprise.prototype, "document", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false }),
        __metadata("design:type", Number)
    ], Enterprise.prototype, "document_type", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false }),
        __metadata("design:type", String)
    ], Enterprise.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false }),
        __metadata("design:type", String)
    ], Enterprise.prototype, "logo_url", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false }),
        __metadata("design:type", Number)
    ], Enterprise.prototype, "category_id", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'json',
        }),
        __metadata("design:type", String)
    ], Enterprise.prototype, "settings", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'json',
        }),
        __metadata("design:type", String)
    ], Enterprise.prototype, "catalog", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Enterprise.prototype, "code", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false }),
        __metadata("design:type", Number)
    ], Enterprise.prototype, "enterprise_user_id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Enterprise.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], Enterprise.prototype, "updated_at", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Category_1.Category; }),
        typeorm_1.JoinColumn({ name: "category_id" }),
        __metadata("design:type", Category_1.Category)
    ], Enterprise.prototype, "category", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return EnterpriseUser_1.EnterpriseUser; }),
        typeorm_1.JoinColumn({ name: "enterprise_user_id" }),
        __metadata("design:type", EnterpriseUser_1.EnterpriseUser)
    ], Enterprise.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Product_1.Product; }, function (product) { return product.enterprise; }),
        __metadata("design:type", Array)
    ], Enterprise.prototype, "products", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return ProductSection_1.ProductSection; }, function (productSection) { return productSection.enterprise; }),
        __metadata("design:type", Array)
    ], Enterprise.prototype, "product_sections", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return OptionalProduct_1.OptionalProduct; }, function (optional) { return optional.enterprise; }),
        __metadata("design:type", Array)
    ], Enterprise.prototype, "optionals", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return OptionalSection_1.OptionalSection; }, function (optional) { return optional.enterprise; }),
        __metadata("design:type", Array)
    ], Enterprise.prototype, "optional_sections", void 0);
    Enterprise = __decorate([
        typeorm_1.Entity({ name: 'enterprise' })
    ], Enterprise);
    return Enterprise;
}());
exports.Enterprise = Enterprise;
//# sourceMappingURL=Enterprise.js.map