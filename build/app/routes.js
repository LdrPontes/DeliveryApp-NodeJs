"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthEnterpriseController_1 = __importDefault(require("./controllers/AuthEnterpriseController"));
var EnterpriseController_1 = __importDefault(require("./controllers/EnterpriseController"));
var ProductController_1 = __importDefault(require("./controllers/ProductController"));
var OptionalController_1 = __importDefault(require("./controllers/OptionalController"));
var ProductSectionController_1 = __importDefault(require("./controllers/ProductSectionController"));
var OptionalSectionController_1 = __importDefault(require("./controllers/OptionalSectionController"));
var AuthMiddleware_1 = __importDefault(require("./middlewares/AuthMiddleware"));
var CategoryController_1 = __importDefault(require("./controllers/CategoryController"));
var EnterpriseUserController_1 = __importDefault(require("./controllers/EnterpriseUserController"));
var OrderController_1 = __importDefault(require("./controllers/OrderController"));
var Routes = /** @class */ (function () {
    function Routes() {
        this.routes = express_1.Router();
        this.authEnterpriseRoutes();
        this.enterpriseRoutes();
        this.optionalRoutes();
        this.optionalSectionRoutes();
        this.productRoutes();
        this.productSectionRoutes();
        this.categoryRoutes();
        this.enterpriseUserRoutes();
        this.orderRoutes();
    }
    Routes.prototype.authEnterpriseRoutes = function () {
        this.routes.post('/enterprise/auth', function (req, res) {
            AuthEnterpriseController_1.default.auth(req, res);
        });
        this.routes.post('/enterprise/register', function (req, res) {
            AuthEnterpriseController_1.default.save(req, res);
        });
    };
    Routes.prototype.enterpriseRoutes = function () {
        this.routes.post('/enterprise/save', AuthMiddleware_1.default, function (req, res) {
            EnterpriseController_1.default.save(req, res);
        });
        this.routes.get('/enterprise/read/:id', AuthMiddleware_1.default, function (req, res) {
            EnterpriseController_1.default.read(req, res);
        });
        this.routes.put('/enterprise/update', AuthMiddleware_1.default, function (req, res) {
            EnterpriseController_1.default.update(req, res);
        });
        this.routes.put('/enterprise/update/settings', AuthMiddleware_1.default, function (req, res) {
            EnterpriseController_1.default.updateSettings(req, res);
        });
        this.routes.put('/enterprise/update/catalog', AuthMiddleware_1.default, function (req, res) {
            EnterpriseController_1.default.updateCatalog(req, res);
        });
    };
    Routes.prototype.productRoutes = function () {
        this.routes.post('/product/save', AuthMiddleware_1.default, function (req, res) {
            ProductController_1.default.save(req, res);
        });
        this.routes.get('/product/read/:id', AuthMiddleware_1.default, function (req, res) {
            ProductController_1.default.read(req, res);
        });
        this.routes.put('/product/update', AuthMiddleware_1.default, function (req, res) {
            ProductController_1.default.update(req, res);
        });
        this.routes.delete('/product/delete/:id', AuthMiddleware_1.default, function (req, res) {
            ProductController_1.default.delete(req, res);
        });
    };
    Routes.prototype.optionalRoutes = function () {
        this.routes.post('/optional/save', AuthMiddleware_1.default, function (req, res) {
            OptionalController_1.default.save(req, res);
        });
        this.routes.get('/optional/read/:id', AuthMiddleware_1.default, function (req, res) {
            OptionalController_1.default.read(req, res);
        });
        this.routes.put('/optional/update', AuthMiddleware_1.default, function (req, res) {
            OptionalController_1.default.update(req, res);
        });
        this.routes.delete('/optional/delete/:id', AuthMiddleware_1.default, function (req, res) {
            OptionalController_1.default.delete(req, res);
        });
    };
    Routes.prototype.productSectionRoutes = function () {
        this.routes.post('/section/product/save', AuthMiddleware_1.default, function (req, res) {
            ProductSectionController_1.default.save(req, res);
        });
        this.routes.get('/section/product/read/:id', AuthMiddleware_1.default, function (req, res) {
            ProductSectionController_1.default.read(req, res);
        });
        this.routes.put('/section/product/update', AuthMiddleware_1.default, function (req, res) {
            ProductSectionController_1.default.update(req, res);
        });
        this.routes.delete('/section/product/delete/:id', AuthMiddleware_1.default, function (req, res) {
            ProductSectionController_1.default.delete(req, res);
        });
    };
    Routes.prototype.optionalSectionRoutes = function () {
        this.routes.post('/section/optional/save', AuthMiddleware_1.default, function (req, res) {
            OptionalSectionController_1.default.save(req, res);
        });
        this.routes.get('/section/optional/read/:id', AuthMiddleware_1.default, function (req, res) {
            OptionalSectionController_1.default.read(req, res);
        });
        this.routes.put('/section/optional/update', AuthMiddleware_1.default, function (req, res) {
            OptionalSectionController_1.default.update(req, res);
        });
        this.routes.delete('/section/optional/delete/:id', AuthMiddleware_1.default, function (req, res) {
            OptionalSectionController_1.default.delete(req, res);
        });
    };
    Routes.prototype.categoryRoutes = function () {
        this.routes.get('/category/read', AuthMiddleware_1.default, function (req, res) {
            CategoryController_1.default.readAll(req, res);
        });
    };
    Routes.prototype.enterpriseUserRoutes = function () {
        this.routes.put('/enterprise/user/update', AuthMiddleware_1.default, function (req, res) {
            EnterpriseUserController_1.default.update(req, res);
        });
    };
    Routes.prototype.orderRoutes = function () {
        this.routes.get('/enterprise/read/code/:code', function (req, res) {
            OrderController_1.default.readEnterpriseByCode(req, res);
        });
    };
    return Routes;
}());
exports.default = new Routes().routes;
//# sourceMappingURL=routes.js.map