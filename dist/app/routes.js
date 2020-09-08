"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AuthEnterpriseController = require('./controllers/AuthEnterpriseController'); var _AuthEnterpriseController2 = _interopRequireDefault(_AuthEnterpriseController);
var _EnterpriseController = require('./controllers/EnterpriseController'); var _EnterpriseController2 = _interopRequireDefault(_EnterpriseController);
var _ProductController = require('./controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);
var _OptionalController = require('./controllers/OptionalController'); var _OptionalController2 = _interopRequireDefault(_OptionalController);
var _ProductSectionController = require('./controllers/ProductSectionController'); var _ProductSectionController2 = _interopRequireDefault(_ProductSectionController);
var _OptionalSectionController = require('./controllers/OptionalSectionController'); var _OptionalSectionController2 = _interopRequireDefault(_OptionalSectionController);
var _AuthMiddleware = require('./middlewares/AuthMiddleware'); var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);
var _CategoryController = require('./controllers/CategoryController'); var _CategoryController2 = _interopRequireDefault(_CategoryController);
var _EnterpriseUserController = require('./controllers/EnterpriseUserController'); var _EnterpriseUserController2 = _interopRequireDefault(_EnterpriseUserController);
var _OrderController = require('./controllers/OrderController'); var _OrderController2 = _interopRequireDefault(_OrderController);


class Routes {
     __init() {this.routes = _express.Router.call(void 0, )}
    

     constructor() {;Routes.prototype.__init.call(this);
        this.authEnterpriseRoutes()
        this.enterpriseRoutes()
        this.optionalRoutes()
        this.optionalSectionRoutes()
        this.productRoutes()
        this.productSectionRoutes()
        this.categoryRoutes()
        this.enterpriseUserRoutes()
        this.orderRoutes()
    }

     authEnterpriseRoutes() {
        this.routes.post('/enterprise/auth', (req, res) => {
            _AuthEnterpriseController2.default.auth(req, res)
        })

        this.routes.post('/enterprise/register', (req, res) => {
            _AuthEnterpriseController2.default.save(req,res)
        })
    }

     enterpriseRoutes() {
        this.routes.post('/enterprise/save', _AuthMiddleware2.default, (req, res) => {
            _EnterpriseController2.default.save(req, res)
        })

        this.routes.get('/enterprise/read/:id', _AuthMiddleware2.default, (req, res) => {
            _EnterpriseController2.default.read(req, res)
        })

        this.routes.put('/enterprise/update', _AuthMiddleware2.default, (req, res) => {
            _EnterpriseController2.default.update(req, res)
        })

        this.routes.put('/enterprise/update/settings', _AuthMiddleware2.default, (req, res) => {
            _EnterpriseController2.default.updateSettings(req, res)
        })

        this.routes.put('/enterprise/update/catalog', _AuthMiddleware2.default, (req, res) => {
            _EnterpriseController2.default.updateCatalog(req, res)
        })
    }

     productRoutes(){
        this.routes.post('/product/save', _AuthMiddleware2.default, (req, res) => {
            _ProductController2.default.save(req, res)
        })

        this.routes.get('/product/read/:id', _AuthMiddleware2.default, (req, res) => {
            _ProductController2.default.read(req, res)
        })

        this.routes.put('/product/update', _AuthMiddleware2.default, (req, res) => {
            _ProductController2.default.update(req, res)
        })

        this.routes.delete('/product/delete/:id', _AuthMiddleware2.default,(req, res) => {
            _ProductController2.default.delete(req, res)
        })
    }

     optionalRoutes(){
        this.routes.post('/optional/save', _AuthMiddleware2.default, (req, res) => {
            _OptionalController2.default.save(req, res)
        })

        this.routes.get('/optional/read/:id', _AuthMiddleware2.default, (req, res) => {
            _OptionalController2.default.read(req, res)
        })

        this.routes.put('/optional/update', _AuthMiddleware2.default, (req, res) => {
            _OptionalController2.default.update(req, res)
        })

        this.routes.delete('/optional/delete/:id', _AuthMiddleware2.default, (req, res) => {
            _OptionalController2.default.delete(req, res)
        })
    }

     productSectionRoutes(){
        this.routes.post('/section/product/save', _AuthMiddleware2.default, (req, res) => {
            _ProductSectionController2.default.save(req, res)
        })

        this.routes.get('/section/product/read/:id', _AuthMiddleware2.default, (req, res) => {
            _ProductSectionController2.default.read(req, res)
        })

        this.routes.put('/section/product/update', _AuthMiddleware2.default, (req, res) => {
            _ProductSectionController2.default.update(req, res)
        })

        this.routes.delete('/section/product/delete/:id', _AuthMiddleware2.default, (req, res) => {
            _ProductSectionController2.default.delete(req, res)
        })
    }

     optionalSectionRoutes(){
        this.routes.post('/section/optional/save', _AuthMiddleware2.default, (req, res) => {
            _OptionalSectionController2.default.save(req, res)
        })

        this.routes.get('/section/optional/read/:id', _AuthMiddleware2.default, (req, res) => {
            _OptionalSectionController2.default.read(req, res)
        })

        this.routes.put('/section/optional/update', _AuthMiddleware2.default, (req, res) => {
            _OptionalSectionController2.default.update(req, res)
        })

        this.routes.delete('/section/optional/delete/:id', _AuthMiddleware2.default, (req, res) => {
            _OptionalSectionController2.default.delete(req, res)
        })
    }

     categoryRoutes(){
        this.routes.get('/category/read', _AuthMiddleware2.default, (req, res) => {
            _CategoryController2.default.readAll(req, res)
        })
    }

     enterpriseUserRoutes() {
        this.routes.put('/enterprise/user/update', _AuthMiddleware2.default, (req, res) => {
            _EnterpriseUserController2.default.update(req, res)
        })
    }

     orderRoutes() {
        this.routes.get('/enterprise/read/code/:code', (req, res) => {
            _OrderController2.default.readEnterpriseByCode(req, res)
        })
    }
}



exports. default = new Routes().routes