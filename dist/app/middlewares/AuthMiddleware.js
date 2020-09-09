"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Strings = require('../utils/Strings'); var _Strings2 = _interopRequireDefault(_Strings);

exports. default = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json(new (0, _AppError2.default)(401, 'INVALID_TOKEN', 'Token not found'))
    }

    const [, token] = authHeader.split(' ')


    try {
        await _jsonwebtoken2.default.verify(token, _Strings2.default.jwt_key)
    } catch (error) {
        return res.status(401).json(new (0, _AppError2.default)(401, 'INVALID_TOKEN', 'Please, provide a valid token'))
    }

    return next()
}