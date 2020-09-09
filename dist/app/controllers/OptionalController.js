"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _DeleteOptionalUseCase = require('../../domain/usecases/optional/DeleteOptionalUseCase');
var _ReadOptionalUseCase = require('../../domain/usecases/optional/ReadOptionalUseCase');
var _SaveOptionalUseCase = require('../../domain/usecases/optional/SaveOptionalUseCase');
var _UpdateOptionalUseCase = require('../../domain/usecases/optional/UpdateOptionalUseCase');
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _Errors = require('../utils/Errors'); var _Errors2 = _interopRequireDefault(_Errors);
var _TextFormat = require('../utils/TextFormat'); var _TextFormat2 = _interopRequireDefault(_TextFormat);

class OptionalController  {constructor() { OptionalController.prototype.__init.call(this);OptionalController.prototype.__init2.call(this);OptionalController.prototype.__init3.call(this);OptionalController.prototype.__init4.call(this); }

    __init() {this.saveOptionalUseCase = new (0, _SaveOptionalUseCase.SaveOptionalUseCase)()}
    __init2() {this.readOptionalUseCase = new (0, _ReadOptionalUseCase.ReadOptionalUseCase)()}
    __init3() {this.updateOptionalUseCase = new (0, _UpdateOptionalUseCase.UpdateOptionalUseCase)()}
    __init4() {this.deleteOptionalUseCase = new (0, _DeleteOptionalUseCase.DeleteOptionalUseCase)()}

    async save(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                price: Yup.number().required(),
                enterprise_id: Yup.number().required().integer(),
                section_id: Yup.number().integer(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { name, price, enterprise_id, section_id } = req.body

            const optional = (await this.saveOptionalUseCase.execute(new (0, _SaveOptionalUseCase.SaveOptionalParams)(name, price, enterprise_id, section_id))).optional

            return res.json(optional)

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
    
            const optional = (await this.readOptionalUseCase.execute(new (0, _ReadOptionalUseCase.ReadOptionalParams)(Number(id)))).optional
    
            return res.json(optional)

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
                price: Yup.number(),
                id: Yup.number().required().integer(),
                section_id: Yup.number().integer(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name, price, section_id } = req.body

            const optional = (await this.updateOptionalUseCase.execute(new (0, _UpdateOptionalUseCase.UpdateOptionalParams)(id , name, price, section_id))).optional

            return res.json(optional)

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
    
            const result = (await this.deleteOptionalUseCase.execute(new (0, _DeleteOptionalUseCase.DeleteOptionalParams)(Number(id)))).success
    
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

const optionalController = new OptionalController()
exports. default = optionalController