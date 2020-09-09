"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _EnterpriseUserRepository = require('../../../data/repositories/EnterpriseUserRepository');

 class UpdateEnterpriseUserUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); UpdateEnterpriseUserUseCase.prototype.__init.call(this); }
     __init() {this.repository = new (0, _EnterpriseUserRepository.EnterpriseUserRepository)()}

    async buildUseCase(params) {
        try {
            const enterpriseUser = await this.repository.update(params.id, params.name, params.telephone, params.email, params.password)

            return new UpdateEnterpriseUserResponse(enterpriseUser)
        } catch (error) {
            console.log(error)
            throw error
        }

    }

} exports.UpdateEnterpriseUserUseCase = UpdateEnterpriseUserUseCase;

 class UpdateEnterpriseUserParams {
    
    
    
    
    

    constructor(id, name, telephone, email, password) {
        this.id = id
        this.name = name
        this.telephone = telephone
        this.email = email
        this.password = password
    }

} exports.UpdateEnterpriseUserParams = UpdateEnterpriseUserParams;

 class UpdateEnterpriseUserResponse {
    __init2() {this.enterpriseUser = null}

    constructor(enterpriseUser) {;UpdateEnterpriseUserResponse.prototype.__init2.call(this);
        this.enterpriseUser = enterpriseUser;
    }
} exports.UpdateEnterpriseUserResponse = UpdateEnterpriseUserResponse;