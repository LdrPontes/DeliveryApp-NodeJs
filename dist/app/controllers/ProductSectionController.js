"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SaveProductSectionUseCase = require('../../domain/usecases/productSection/SaveProductSectionUseCase');
var _ReadProductSectionUseCase = require('../../domain/usecases/productSection/ReadProductSectionUseCase');
var _UpdateProductSectionUseCase = require('../../domain/usecases/productSection/UpdateProductSectionUseCase');
var _DeleteProductSectionUseCase = require('../../domain/usecases/productSection/DeleteProductSectionUseCase');
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _Errors = require('../utils/Errors'); var _Errors2 = _interopRequireDefault(_Errors);
var _TextFormat = require('../utils/TextFormat'); var _TextFormat2 = _interopRequireDefault(_TextFormat);
var _util = require('util');

class ProductSectionController  {constructor() { ProductSectionController.prototype.__init.call(this);ProductSectionController.prototype.__init2.call(this);ProductSectionController.prototype.__init3.call(this);ProductSectionController.prototype.__init4.call(this); }

    __init() {this.saveProductSectionUseCase = new (0, _SaveProductSectionUseCase.SaveProductSectionUseCase)()}
    __init2() {this.readProductSectionUseCase = new (0, _ReadProductSectionUseCase.ReadProductSectionUseCase)()}
    __init3() {this.updateProductSectionUseCase = new (0, _UpdateProductSectionUseCase.UpdateProductSectionUseCase)()}
    __init4() {this.deleteProductSectionUseCase = new (0, _DeleteProductSectionUseCase.DeleteProductSectionUseCase)()}

    async save(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                enterprise_id: Yup.number().required().integer()
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { name, enterprise_id } = req.body

            const section = (await this.saveProductSectionUseCase.execute(new (0, _SaveProductSectionUseCase.SaveProductSectionParams)(name, enterprise_id))).section

            return res.json(section)

        } catch (error) {
            if(_Errors2.default.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new (0, _AppError2.default)(500, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            }
        }
    }

    async read(req, res) {
        try { 
            const schema = Yup.object().shape({
                id: Yup.number().integer().required()
            })
    
            if (!(await schema.isValid(req.params))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }
    
            const { id } = req.params
            
            let search = req.query.search
            
            if(_util.isNullOrUndefined.call(void 0, search)) {
                search = ''
            } else {
                search = search.toString()
            }
            

            const sections = (await this.readProductSectionUseCase.execute(new (0, _ReadProductSectionUseCase.ReadProductSectionParams)(Number(id), search))).sections
    
            return res.json(sections)

        } catch (error) {
            if(_Errors2.default.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new (0, _AppError2.default)(500, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            }
        }
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string(),
                id: Yup.number().required().integer(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name} = req.body

            const section = (await this.updateProductSectionUseCase.execute(new (0, _UpdateProductSectionUseCase.UpdateProductSectionParams)(id , name))).section

            return res.json(section)

        } catch (error) {
            if(_Errors2.default.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new (0, _AppError2.default)(500, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            }
        }
    }

    async delete(req, res) {
        try { 
            const schema = Yup.object().shape({
                id: Yup.number().integer().required()
            })
    
            if (!(await schema.isValid(req.params))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }
    
            const { id } = req.params
    
            const result = (await this.deleteProductSectionUseCase.execute(new (0, _DeleteProductSectionUseCase.DeleteProductSectionParams)(Number(id)))).success
    
            return res.status(result ? 200 : 400).json({
                status: result ? 200 : 400,
                name: result ? 'ENTITY_DELETED' : 'ENTITY_NOT_FOUND',
                success: result
            })

        } catch (error) {
            if(_Errors2.default.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new (0, _AppError2.default)(500, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            }
        }
    }
}

const productSectionController = new ProductSectionController()
exports. default = productSectionController