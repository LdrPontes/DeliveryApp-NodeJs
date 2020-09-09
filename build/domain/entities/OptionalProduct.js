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
exports.OptionalProduct = void 0;
var typeorm_1 = require("typeorm");
var OptionalSection_1 = require("./OptionalSection");
var Enterprise_1 = require("./Enterprise");
var OptionalProduct = /** @class */ (function () {
    function OptionalProduct() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], OptionalProduct.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, precision: 2, type: "float" }),
        __metadata("design:type", Number)
    ], OptionalProduct.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, length: 255 }),
        __metadata("design:type", String)
    ], OptionalProduct.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false }),
        __metadata("design:type", Number)
    ], OptionalProduct.prototype, "enterprise_id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false }),
        __metadata("design:type", Number)
    ], OptionalProduct.prototype, "optional_section_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Enterprise_1.Enterprise; }, function (enterprise) { return enterprise.optionals; }),
        typeorm_1.JoinColumn({ name: 'enterprise_id' }),
        __metadata("design:type", Enterprise_1.Enterprise)
    ], OptionalProduct.prototype, "enterprise", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return OptionalSection_1.OptionalSection; }, function (section) { return section.products; }),
        typeorm_1.JoinColumn({ name: "optional_section_id" }),
        __metadata("design:type", OptionalSection_1.OptionalSection)
    ], OptionalProduct.prototype, "section", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], OptionalProduct.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], OptionalProduct.prototype, "updated_at", void 0);
    OptionalProduct = __decorate([
        typeorm_1.Entity({ name: "optional_product" })
    ], OptionalProduct);
    return OptionalProduct;
}());
exports.OptionalProduct = OptionalProduct;
//# sourceMappingURL=OptionalProduct.js.map