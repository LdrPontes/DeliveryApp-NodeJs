"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _AuthRepository = require('../../../data/repositories/AuthRepository');

 class SignInEnterpriseUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); SignInEnterpriseUseCase.prototype.__init.call(this); }
     __init() {this.repository = new (0, _AuthRepository.AuthRepository)()}

    async buildUseCase(params) {
        try {
            const enterpriseUser = await this.repository.authenticateEnterprise(params.email, params.password)

            return new SignInEnterpriseResponse(enterpriseUser)
        } catch (error) {
            console.log("Error UseCase")
            throw error
        }

    }

} exports.SignInEnterpriseUseCase = SignInEnterpriseUseCase;

 class SignInEnterpriseParams {
    
    

    constructor(email, password) {
        this._email = email
        this._password = password
    }

    get email() {
        return this._email
    }

    get password() {
        return this._password
    }
} exports.SignInEnterpriseParams = SignInEnterpriseParams;

 class SignInEnterpriseResponse {
     __init2() {this._enterpriseUser = null}

    constructor(enterpriseUser) {;SignInEnterpriseResponse.prototype.__init2.call(this);
        this._enterpriseUser = enterpriseUser;
    }

    get enterpriseUser() {
        return this._enterpriseUser
    }
} exports.SignInEnterpriseResponse = SignInEnterpriseResponse;