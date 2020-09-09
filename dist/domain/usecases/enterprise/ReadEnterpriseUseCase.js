"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _EnterpriseRepository = require('../../../data/repositories/EnterpriseRepository');

 class ReadEnterpriseUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); ReadEnterpriseUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _EnterpriseRepository.EnterpriseRepository)()}

    async buildUseCase(params) {
        try {

            const result = await this.repository.read(params.id)

            return new ReadEnterpriseResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.ReadEnterpriseUseCase = ReadEnterpriseUseCase;

 class ReadEnterpriseResponse {
    

    constructor(enterprise) {
        this.enterprise = enterprise
    }
} exports.ReadEnterpriseResponse = ReadEnterpriseResponse;

 class ReadEnterpriseParams {
    

    constructor(id) {
        this.id = id
    }
} exports.ReadEnterpriseParams = ReadEnterpriseParams;