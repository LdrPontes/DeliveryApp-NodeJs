"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _EnterpriseRepository = require('../../../data/repositories/EnterpriseRepository');

 class DeleteEnterpriseUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); DeleteEnterpriseUseCase.prototype.__init.call(this); }
    
    __init() {this.repository = new (0, _EnterpriseRepository.EnterpriseRepository)()}


    async buildUseCase(params) {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteEnterpriseResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.DeleteEnterpriseUseCase = DeleteEnterpriseUseCase;

 class DeleteEnterpriseResponse {
    

    constructor(success) {
        this.success = success
    }
} exports.DeleteEnterpriseResponse = DeleteEnterpriseResponse;

 class DeleteEnterpriseParams {
    

    constructor(id) {
        this.id = id
    }
} exports.DeleteEnterpriseParams = DeleteEnterpriseParams;