"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _typeorm = require('typeorm');
var _EnterpriseUser = require('../../domain/entities/EnterpriseUser');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class EnterpriseUserRepository  {

    async update(id, name, telephone, email, password) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _EnterpriseUser.EnterpriseUser);
            
            let password_hash = ''

            if(password){
                password_hash = await _bcryptjs2.default.hash(password, 8)
            }
            
           
            const values =  { name: name, telephone: telephone, email: email, password_hash: password_hash !== '' ? password_hash : undefined }
            
            await repository.update(id, JSON.parse(JSON.stringify(values)))

            return await repository.findOneOrFail({ where: { email }, relations: ["enterprise"]})

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.EnterpriseUserRepository = EnterpriseUserRepository;