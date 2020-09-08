"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SaveOptionalSectionUseCase = require('../../domain/usecases/optionalSection/SaveOptionalSectionUseCase');
var _ReadOptionalSectionUseCase = require('../../domain/usecases/optionalSection/ReadOptionalSectionUseCase');
var _UpdateOptionalSectionUseCase = require('../../domain/usecases/optionalSection/UpdateOptionalSectionUseCase');
var _DeleteOptionalSectionUseCase = require('../../domain/usecases/optionalSection/DeleteOptionalSectionUseCase');
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _Errors = require('../utils/Errors'); var _Errors2 = _interopRequireDefault(_Errors);
var _TextFormat = require('../utils/TextFormat'); var _TextFormat2 = _interopRequireDefault(_TextFormat);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _util = require('util');


class OptionalSectionController  {constructor() { OptionalSectionController.prototype.__init.call(this);OptionalSectionController.prototype.__init2.call(this);OptionalSectionController.prototype.__init3.call(this);OptionalSectionController.prototype.__init4.call(this); }
    __init() {this.saveOptionalUseCase = new (0, _SaveOptionalSectionUseCase.SaveOptionalSectionUseCase)()}
    __init2() {this.readOptionalUseCase = new (0, _ReadOptionalSectionUseCase.ReadOptionalSectionUseCase)()}
    __init3() {this.updateOptionalUseCase = new (0, _UpdateOptionalSectionUseCase.UpdateOptionalSectionUseCase)()}
    __init4() {this.deleteOptionalUseCase = new (0, _DeleteOptionalSectionUseCase.DeleteOptionalSectionUseCase)()}

    async save(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                min: Yup.number().required(),
                max: Yup.number().required(),
                enterprise_id: Yup.number().required().integer()
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { name, enterprise_id, min, max } = req.body

            const section = (await this.saveOptionalUseCase.execute(new (0, _SaveOptionalSectionUseCase.SaveOptionalSectionParams)(name, enterprise_id, min, max))).section

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
            

            const sections = (await this.readOptionalUseCase.execute(new (0, _ReadOptionalSectionUseCase.ReadOptionalSectionParams)(Number(id), search))).sections
    
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
                min: Yup.number(),
                max: Yup.number(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name, min, max } = req.body

            const section = (await this.updateOptionalUseCase.execute(new (0, _UpdateOptionalSectionUseCase.UpdateOptionalSectionParams)(id , name, min, max))).section

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
    
            const result = (await this.deleteOptionalUseCase.execute(new (0, _DeleteOptionalSectionUseCase.DeleteOptionalSectionParams)(Number(id)))).success
    
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

const optionalSectionController = new OptionalSectionController()
exports. default = optionalSectionController