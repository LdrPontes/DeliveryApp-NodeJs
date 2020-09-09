"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _EnterpriseRepository = require('../../../data/repositories/EnterpriseRepository');

 class UpdateEnterpriseUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); UpdateEnterpriseUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _EnterpriseRepository.EnterpriseRepository)()}

    async buildUseCase(params) {
        try {
            
            const result = await this.repository.update(params.id, params.name, params.address, params.logo_url, params.category_id)

            return new UpdateEnterpriseResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.UpdateEnterpriseUseCase = UpdateEnterpriseUseCase;

 class UpdateEnterpriseResponse {
    

    constructor(enterprise) {
        this.enterprise = enterprise
    }
} exports.UpdateEnterpriseResponse = UpdateEnterpriseResponse;

 class UpdateEnterpriseParams {
    
    
    
    
    

    constructor(id, name, address, logo_url, category_id) {
        this.id = id
        this.name = name
        this.logo_url = logo_url
        this.address = address
        this.category_id = category_id
    }
} exports.UpdateEnterpriseParams = UpdateEnterpriseParams;