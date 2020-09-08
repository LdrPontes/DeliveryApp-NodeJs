"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _EnterpriseRepository = require('../../../data/repositories/EnterpriseRepository');

 class ReadEnterpriseByCodeUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); ReadEnterpriseByCodeUseCase.prototype.__init.call(this); }
    
    __init() {this.repository = new (0, _EnterpriseRepository.EnterpriseRepository)()}

    async buildUseCase(params) {
        const result = await this.repository.readByCode(params.code)

        return new ReadEnterpriseByCodeResponse(result)
    }

} exports.ReadEnterpriseByCodeUseCase = ReadEnterpriseByCodeUseCase;

 class ReadEnterpriseByCodeResponse {
    

    constructor(enterprise) {
        this.enterprise = enterprise
    }
} exports.ReadEnterpriseByCodeResponse = ReadEnterpriseByCodeResponse;

 class ReadEnterpriseByCodeParams {
    

    constructor(code) {
        this.code = code
    }
} exports.ReadEnterpriseByCodeParams = ReadEnterpriseByCodeParams;