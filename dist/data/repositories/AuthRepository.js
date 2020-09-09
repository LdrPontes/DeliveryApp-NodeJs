"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _EnterpriseUser = require('../../domain/entities/EnterpriseUser');
var _typeorm = require('typeorm');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _AppError = require('../../domain/utils/AppError'); var _AppError2 = _interopRequireDefault(_AppError);

 class AuthRepository  {
 
    async registerEnterprise(name, telephone, email, password) {
        try {

            const enterpriseUserRepository = _typeorm.getRepository.call(void 0, _EnterpriseUser.EnterpriseUser);

            const enterpriseUser = new (0, _EnterpriseUser.EnterpriseUser)()

            enterpriseUser.name = name
            enterpriseUser.telephone = telephone
            enterpriseUser.email = email
            enterpriseUser.password_hash = await _bcryptjs2.default.hash(password, 8)

            return await enterpriseUserRepository.save(enterpriseUser)
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async authenticateEnterprise(email, password) {
        try {
            const enterpriseUserRepository = _typeorm.getRepository.call(void 0, _EnterpriseUser.EnterpriseUser);

            const result = await enterpriseUserRepository.findOneOrFail({ where: { email }, relations: ["enterprise"]})

            console.log(result)

            if (await _bcryptjs2.default.compare(password, result.password_hash)) {
                return result
            } else {
                throw new (0, _AppError2.default)(401, 'INVALID_PASSWORD', 'Incorrect password')
            }
        } catch (error) {
            console.log(error)
            throw error
        }

    }
} exports.AuthRepository = AuthRepository;