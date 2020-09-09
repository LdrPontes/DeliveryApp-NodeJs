"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _AuthRepository = require('../../../data/repositories/AuthRepository');

 class SignUpEnterpriseUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); SignUpEnterpriseUseCase.prototype.__init.call(this); }
     __init() {this.repository = new (0, _AuthRepository.AuthRepository)()}

    async buildUseCase(params) {
        try {
            const enterpriseUser = await this.repository.registerEnterprise(params.name, params.telephone, params.email, params.password)

            return new SignUpEnterpriseResponse(enterpriseUser)
        } catch (error) {
            console.log(error)
            throw error
        }

    }

} exports.SignUpEnterpriseUseCase = SignUpEnterpriseUseCase;

 class SignUpEnterpriseParams {
    
    
    
    

    constructor(name, telephone, email, password) {
        this._name = name
        this._telephone = telephone
        this._email = email
        this._password = password
    }
    get name() {
        return this._name
    }

    get telephone() {
        return this._telephone
    }

    get email() {
        return this._email
    }

    get password() {
        return this._password
    }
} exports.SignUpEnterpriseParams = SignUpEnterpriseParams;

 class SignUpEnterpriseResponse {
     __init2() {this._enterpriseUser = null}

    constructor(enterpriseUser) {;SignUpEnterpriseResponse.prototype.__init2.call(this);
        this._enterpriseUser = enterpriseUser;
    }

    get enterpriseUser() {
        return this._enterpriseUser
    }
} exports.SignUpEnterpriseResponse = SignUpEnterpriseResponse;