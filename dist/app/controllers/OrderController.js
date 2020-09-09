"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _TextFormat = require('../utils/TextFormat'); var _TextFormat2 = _interopRequireDefault(_TextFormat);
var _Errors = require('../utils/Errors'); var _Errors2 = _interopRequireDefault(_Errors);
var _ReadEnterpriseByCodeUseCase = require('../../domain/usecases/order/ReadEnterpriseByCodeUseCase');

class OrderController {constructor() { OrderController.prototype.__init.call(this); }
    __init() {this.readEnterpriseByCodeUseCase = new (0, _ReadEnterpriseByCodeUseCase.ReadEnterpriseByCodeUseCase)()}

    async readEnterpriseByCode(req, res) {
        try {
            const schema = Yup.object().shape({
                code: Yup.string().required(),
            })

            if (!(await schema.isValid(req.params))) {
                return res.status(400).json(new (0, _AppError2.default)(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const {code} = req.params
            
            const result = await (await this.readEnterpriseByCodeUseCase.execute(new (0, _ReadEnterpriseByCodeUseCase.ReadEnterpriseByCodeParams)(code))).enterprise

            return res.json(result)

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


const orderController = new OrderController()
exports. default = orderController