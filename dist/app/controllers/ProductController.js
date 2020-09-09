"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SaveProductUseCase = require('../../domain/usecases/product/SaveProductUseCase');
var _ReadProductUseCase = require('../../domain/usecases/product/ReadProductUseCase');
var _UpdateProductUseCase = require('../../domain/usecases/product/UpdateProductUseCase');
var _DeleteProductUseCase = require('../../domain/usecases/product/DeleteProductUseCase');
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _Errors = require('../utils/Errors'); var _Errors2 = _interopRequireDefault(_Errors);
var _TextFormat = require('../utils/TextFormat'); var _TextFormat2 = _interopRequireDefault(_TextFormat);
var _UploadImageUseCase = require('../../domain/usecases/image/UploadImageUseCase');
var _uuid = require('uuid');

class ProductController  {constructor() { ProductController.prototype.__init.call(this);ProductController.prototype.__init2.call(this);ProductController.prototype.__init3.call(this);ProductController.prototype.__init4.call(this);ProductController.prototype.__init5.call(this); }

    __init() {this.saveProductUseCase = new (0, _SaveProductUseCase.SaveProductUseCase)()}
    __init2() {this.readProductUseCase = new (0, _ReadProductUseCase.ReadProductUseCase)()}
    __init3() {this.updateProductUseCase = new (0, _UpdateProductUseCase.UpdateProductUseCase)()}
    __init4() {this.deleteProductUseCase = new (0, _DeleteProductUseCase.DeleteProductUseCase)()}
    
    __init5() {this.uploadImageUseCase = new (0, _UploadImageUseCase.UploadImageUseCase)()}

    async save(req, res) {
        try {
            const schema = Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().required(),
                img: Yup.string(),
                img_type: Yup.string(),
                price: Yup.number().required(),
                enterprise_id: Yup.number().required().integer(),
                section_id: Yup.number().integer(),
                optional_sections: Yup.array()
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { title, description, img, img_type, price, enterprise_id, product_section_id, optional_sections } = req.body

            //Salva os dados no db
            let img_url = ''

            if (img != null && img_type != null && img != "" && img_type != "") {
                img_url = (await this.uploadImageUseCase.execute(new (0, _UploadImageUseCase.UploadImageParams)(_uuid.v4.call(void 0, ), img, img_type))).url
            }

            const product = (await this.saveProductUseCase.execute(new (0, _SaveProductUseCase.SaveProductParams)(title, description, img_url, price, enterprise_id, product_section_id, optional_sections))).product

            return res.json(product)

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
    
            const product = (await this.readProductUseCase.execute(new (0, _ReadProductUseCase.ReadProductParams)(Number(id)))).product
    
            return res.json(product)

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
                title: Yup.string(),
                description: Yup.string(),
                price: Yup.number(),
                img: Yup.string(),
                img_type: Yup.string(),
                id: Yup.number().required().integer(),
                section_id: Yup.number().integer(),
                optional_sections: Yup.array()
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }
            const { id, title, description, img, img_type, price, product_section_id, optional_sections } = req.body

            //Salva os dados no db
            let img_url = ''

            if (img != null && img_type != null && img != "" && img_type != "") {
                img_url = (await this.uploadImageUseCase.execute(new (0, _UploadImageUseCase.UploadImageParams)(_uuid.v4.call(void 0, ), img, img_type))).url
            }
        
            const product = (await this.updateProductUseCase.execute(new (0, _UpdateProductUseCase.UpdateProductParams)(id , title, description, img_url, price, product_section_id, optional_sections))).product

            return res.json(product)

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
    
            const result = (await this.deleteProductUseCase.execute(new (0, _DeleteProductUseCase.DeleteProductParams)(Number(id)))).success
    
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

const productController = new ProductController()
exports. default = productController