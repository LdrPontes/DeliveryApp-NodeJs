"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _SignInEnterpriseUseCase = require('../../domain/usecases/auth/SignInEnterpriseUseCase');
var _SignUpEnterpriseUseCase = require('../../domain/usecases/auth/SignUpEnterpriseUseCase');
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _TextFormat = require('../utils/TextFormat'); var _TextFormat2 = _interopRequireDefault(_TextFormat);
var _Strings = require('../utils/Strings'); var _Strings2 = _interopRequireDefault(_Strings);

class AuthEnterpriseController {constructor() { AuthEnterpriseController.prototype.__init.call(this);AuthEnterpriseController.prototype.__init2.call(this); }
    __init() {this.signInEnterpriseUseCase = new (0, _SignInEnterpriseUseCase.SignInEnterpriseUseCase)()}
    __init2() {this.signUpEnterpriseUseCase = new (0, _SignUpEnterpriseUseCase.SignUpEnterpriseUseCase)()}

     async save(req, res) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                telephone: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { name, telephone, email, password } = req.body

            const enterprise = (await this.signUpEnterpriseUseCase.execute(new (0, _SignUpEnterpriseUseCase.SignUpEnterpriseParams)(name, telephone, email, password))).enterpriseUser

            res.json({
                enterprise_user: {
                    id: enterprise.id,
                    name: enterprise.name,
                    telephone: enterprise.telephone,
                    email: enterprise.email,
                    created_at: enterprise.created_at,
                    updated_at: enterprise.updated_at,
                },
                token: _jsonwebtoken2.default.sign({ id: enterprise.id }, _Strings2.default.jwt_key, {
                    expiresIn: '1d'

                })
            })
        } catch (error) {
            console.log(error)
            if (error.message.includes('ER_DUP_ENTRY'))
                res.status(400).json(new (0, _AppError2.default)(400, 'ER_DUP_ENTRY', error.message))
            else
                res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore(error.name), error.message))
        }
    }

     async auth(req, res) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
            })

            if (!(await schema.isValid(req.body))) {
                console.log(schema)
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { email, password } = req.body

            const enterprise = (await this.signInEnterpriseUseCase.execute(new (0, _SignInEnterpriseUseCase.SignInEnterpriseParams)(email, password))).enterpriseUser

            res.json({
                enterprise_user: {
                    id: enterprise.id,
                    name: enterprise.name,
                    telephone: enterprise.telephone,
                    email: enterprise.email,
                    enterprise: enterprise.enterprise,
                    created_at: enterprise.created_at,
                    updated_at: enterprise.updated_at,
                },
                token: _jsonwebtoken2.default.sign({ id: enterprise.id }, _Strings2.default.jwt_key, {
                    expiresIn: '1d'

                })
            })
        } catch (error) {
            res.status(401).json(new (0, _AppError2.default)(401, _TextFormat2.default.camelToUnderscore(error.name), error.message))
        }

    }


}

const authEnterpriseController = new AuthEnterpriseController()
exports. default = authEnterpriseController