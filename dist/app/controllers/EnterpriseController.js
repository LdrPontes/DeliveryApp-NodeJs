"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _Errors = require('../utils/Errors'); var _Errors2 = _interopRequireDefault(_Errors);
var _TextFormat = require('../utils/TextFormat'); var _TextFormat2 = _interopRequireDefault(_TextFormat);
var _SaveEnterpriseUseCase = require('../../domain/usecases/enterprise/SaveEnterpriseUseCase');
var _ReadEnterpriseUseCase = require('../../domain/usecases/enterprise/ReadEnterpriseUseCase');
var _UpdateEnterpriseUseCase = require('../../domain/usecases/enterprise/UpdateEnterpriseUseCase');
var _DeleteEnterpriseUseCase = require('../../domain/usecases/enterprise/DeleteEnterpriseUseCase');
var _UploadImageUseCase = require('../../domain/usecases/image/UploadImageUseCase');
var _uuid = require('uuid');
var _cpfcnpjvalidator = require('cpf-cnpj-validator');
var _UpdateEntepriseSettingsUseCase = require('../../domain/usecases/enterprise/UpdateEntepriseSettingsUseCase');
var _UpdateCatalogUseCase = require('../../domain/usecases/enterprise/UpdateCatalogUseCase');

class EnterpriseController  {constructor() { EnterpriseController.prototype.__init.call(this);EnterpriseController.prototype.__init2.call(this);EnterpriseController.prototype.__init3.call(this);EnterpriseController.prototype.__init4.call(this);EnterpriseController.prototype.__init5.call(this);EnterpriseController.prototype.__init6.call(this);EnterpriseController.prototype.__init7.call(this); }

    __init() {this.saveEnterpriseUseCase = new (0, _SaveEnterpriseUseCase.SaveEnterpriseUseCase)()}
    __init2() {this.readEnterpriseUseCase = new (0, _ReadEnterpriseUseCase.ReadEnterpriseUseCase)()}
    __init3() {this.updateEnterpriseUseCase = new (0, _UpdateEnterpriseUseCase.UpdateEnterpriseUseCase)()}
    __init4() {this.updateEnterpriseSettingsUseCase = new (0, _UpdateEntepriseSettingsUseCase.UpdateEnterpriseSettingsUseCase)()}
    __init5() {this.updateEnterpriseCatalogUseCase = new (0, _UpdateCatalogUseCase.UpdateEnterpriseCatalogUseCase)()}
    __init6() {this.deleteEnterpriseUseCase = new (0, _DeleteEnterpriseUseCase.DeleteEnterpriseUseCase)()}

    __init7() {this.uploadImageUseCase = new (0, _UploadImageUseCase.UploadImageUseCase)()}

    async save(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                document_type: Yup.number().required(),
                document: Yup.string().required(),
                img: Yup.string(),
                img_type: Yup.string(),
                address: Yup.string().required(),
                category_id: Yup.number().required().integer(),
                enterprise_id: Yup.number().required().integer(),
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }


            const { name, document_type, document, address, img, img_type, enterprise_id, category_id } = req.body

            //Valida o documento
            if (document_type == 0) { //CPF
                if (!_cpfcnpjvalidator.cpf.isValid(document)) {
                    return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore('INVALID_DOCUMENT'), 'This document (CPF) is not valid'))
                }
            } else {    //CNPJ
                if (!_cpfcnpjvalidator.cnpj.isValid(document)) {
                    return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore('INVALID_DOCUMENT'), 'This document (CNPJ) is not valid'))
                }
            }


            //Salva os dados no db
            let logo_url = ''

            if (img != null && img_type != null && img != "" && img_type != "") {
                logo_url = (await this.uploadImageUseCase.execute(new (0, _UploadImageUseCase.UploadImageParams)(_uuid.v4.call(void 0, ), img, img_type))).url
            }


            const optional = (await this.saveEnterpriseUseCase.execute(new (0, _SaveEnterpriseUseCase.SaveEnterpriseParams)(name, document_type, document, address, logo_url, enterprise_id, category_id))).enterprise

            return res.json(optional)

        } catch (error) {
            if (_Errors2.default.isQueryError(error)) {
                if (error.message.includes('ER_DUP_ENTRY'))
                    return res.status(400).json(new (0, _AppError2.default)(400, 'ER_DUP_ENTRY', error.message))
                else
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

            const enterprise = (await this.readEnterpriseUseCase.execute(new (0, _ReadEnterpriseUseCase.ReadEnterpriseParams)(Number(id)))).enterprise

            return res.json(enterprise)

        } catch (error) {
            if (_Errors2.default.isQueryError(error)) {
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
                img: Yup.string(),
                img_type: Yup.string(),
                address: Yup.string(),
                id: Yup.number().required().integer(),
                category_id: Yup.number().integer(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name, address, img, img_type, category_id } = req.body

            //Salva os dados no db
            let logo_url = ''

            if (img != null && img_type != null && img != "" && img_type != "") {
                logo_url = (await this.uploadImageUseCase.execute(new (0, _UploadImageUseCase.UploadImageParams)(_uuid.v4.call(void 0, ), img, img_type))).url
            }

            const enterprise = (await this.updateEnterpriseUseCase.execute(new (0, _UpdateEnterpriseUseCase.UpdateEnterpriseParams)(id, name, address, logo_url, category_id))).enterprise

            return res.json(enterprise)

        } catch (error) {
            if (_Errors2.default.isQueryError(error)) {
                if (error.message.includes('ER_DUP_ENTRY'))
                    return res.status(400).json(new (0, _AppError2.default)(400, 'ER_DUP_ENTRY', error.message))
                else
                    return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new (0, _AppError2.default)(500, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            }
        }
    }

    async updateSettings(req, res) {
        try {
            const schema = Yup.object().shape({
                id: Yup.number().required().integer(),
                settings: Yup.object().required(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, settings } = req.body


            const result = (await this.updateEnterpriseSettingsUseCase.execute(new (0, _UpdateEntepriseSettingsUseCase.UpdateEnterpriseSettingsParams)(id, settings))).success

            return res.status(result ? 200 : 400).json({
                status: result ? 200 : 400,
                name: result ? 'ENTERPRISE_SETTINGS_UPDATED' : 'ENTITY_NOT_FOUND',
                success: result
            })

        } catch (error) {
            if (_Errors2.default.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new (0, _AppError2.default)(500, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            }
        }
    }

    async updateCatalog(req, res) {
        try {
            const schema = Yup.object().shape({
                id: Yup.number().required().integer(),
                catalog: Yup.object().required(),
                code: Yup.string().required(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, catalog, code } = req.body


            const result = (await this.updateEnterpriseCatalogUseCase.execute(new (0, _UpdateCatalogUseCase.UpdateEnterpriseCatalogParams)(id, catalog, code))).success

            return res.status(result ? 200 : 400).json({
                status: result ? 200 : 400,
                name: result ? 'ENTERPRISE_CATALOG_UPDATED' : 'ENTITY_NOT_FOUND',
                success: result
            })

        } catch (error) {
            if (_Errors2.default.isQueryError(error)) {
                if (error.message.includes('ER_DUP_ENTRY'))
                    return res.status(400).json(new (0, _AppError2.default)(400, 'ER_DUP_ENTRY', error.message))
                else
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

            const result = (await this.deleteEnterpriseUseCase.execute(new (0, _DeleteEnterpriseUseCase.DeleteEnterpriseParams)(Number(id)))).success

            return res.status(result ? 200 : 400).json({
                status: result ? 200 : 400,
                name: result ? 'ENTITY_DELETED' : 'ENTITY_NOT_FOUND',
                success: result
            })

        } catch (error) {
            if (_Errors2.default.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new (0, _AppError2.default)(500, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            }
        }
    }
}

const enterpriseController = new EnterpriseController()
exports. default = enterpriseController