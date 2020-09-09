"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _TextFormat = require('../utils/TextFormat'); var _TextFormat2 = _interopRequireDefault(_TextFormat);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Errors = require('../utils/Errors'); var _Errors2 = _interopRequireDefault(_Errors);
var _UpdateEnterpriseUserUseCase = require('../../domain/usecases/enterpriseUser/UpdateEnterpriseUserUseCase');

class EnterpriseUserController  {constructor() { EnterpriseUserController.prototype.__init.call(this); }
    __init() {this.updateEnterpriseUserUseCase = new (0, _UpdateEnterpriseUserUseCase.UpdateEnterpriseUserUseCase)()}
    async save(req, res) {
        //TODO Not Implemented
    }

    async read(req, res) {
        //TODO Not Implemented
    }

    async update(req, res) {
        try {
            const schema = Yup.object().shape({
                id: Yup.number().integer().required(),
                name: Yup.string().min(3),
                telephone: Yup.string().min(13),
                email: Yup.string().email(),
                password: Yup.string().min(6),
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name, telephone, email, password } = req.body

            const enterprise = (await this.updateEnterpriseUserUseCase.execute(new (0, _UpdateEnterpriseUserUseCase.UpdateEnterpriseUserParams)(id, name, telephone, email, password))).enterpriseUser
            res.json({
                id: enterprise.id,
                name: enterprise.name,
                telephone: enterprise.telephone,
                email: enterprise.email,
                enterprise: enterprise.enterprise,
                created_at: enterprise.created_at,
                updated_at: enterprise.updated_at,
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
        //TODO Not Implemented
    }
}

const enterpriseUserController = new EnterpriseUserController()
exports. default = enterpriseUserController