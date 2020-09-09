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
exports.OptionalSection = void 0;
var typeorm_1 = require("typeorm");
var OptionalProduct_1 = require("./OptionalProduct");
var Enterprise_1 = require("./Enterprise");
var OptionalSection = /** @class */ (function () {
    function OptionalSection() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], OptionalSection.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, length: 255 }),
        __metadata("design:type", String)
    ], OptionalSection.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ default: 0 }),
        __metadata("design:type", Number)
    ], OptionalSection.prototype, "min", void 0);
    __decorate([
        typeorm_1.Column({ default: 50 }),
        __metadata("design:type", Number)
    ], OptionalSection.prototype, "max", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return OptionalProduct_1.OptionalProduct; }, function (product) { return product.section; }),
        __metadata("design:type", Array)
    ], OptionalSection.prototype, "products", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false }),
        __metadata("design:type", Number)
    ], OptionalSection.prototype, "enterprise_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Enterprise_1.Enterprise; }, function (enterprise) { return enterprise.optional_sections; }),
        typeorm_1.JoinColumn({ name: 'enterprise_id' }),
        __metadata("design:type", Enterprise_1.Enterprise)
    ], OptionalSection.prototype, "enterprise", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], OptionalSection.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], OptionalSection.prototype, "updated_at", void 0);
    OptionalSection = __decorate([
        typeorm_1.Entity({ name: "optional_section" })
    ], OptionalSection);
    return OptionalSection;
}());
exports.OptionalSection = OptionalSection;
//# sourceMappingURL=OptionalSection.js.map