"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ReadAllCategoryUseCase = require('../../domain/usecases/category/ReadAllCategoryUseCase');
var _Errors = require('../utils/Errors'); var _Errors2 = _interopRequireDefault(_Errors);
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);

var _TextFormat = require('../utils/TextFormat'); var _TextFormat2 = _interopRequireDefault(_TextFormat);


class CategoryController {constructor() { CategoryController.prototype.__init.call(this); }

    __init() {this.readAllCategoryUseCase = new (0, _ReadAllCategoryUseCase.ReadAllCategoryUseCase)()}

    async readAll(req, res) {
        try {
            const result = await (await this.readAllCategoryUseCase.execute()).categories

            res.json(result)
        } catch (error) {
            if (_Errors2.default.isQueryError(error)) {
                return res.status(400).json(new (0, _AppError2.default)(400, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new (0, _AppError2.default)(500, _TextFormat2.default.camelToUnderscore(error.name), error.message))
            }
        }
    }
}

const categoryController = new CategoryController()
exports. default = categoryController