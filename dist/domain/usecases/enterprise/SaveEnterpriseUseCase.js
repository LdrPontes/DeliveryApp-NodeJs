"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _EnterpriseRepository = require('../../../data/repositories/EnterpriseRepository');

 class SaveEnterpriseUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); SaveEnterpriseUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _EnterpriseRepository.EnterpriseRepository)()}

    async buildUseCase(params) {
     
        try {
            
            const result = await this.repository.save(params.name, params.document_type, params.document, params.address, params.logo_url, params.enterprise_id, params.category_id)

            return new SaveEnterpriseResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }
} exports.SaveEnterpriseUseCase = SaveEnterpriseUseCase;

 class SaveEnterpriseResponse {
    

    constructor(enterprise) {
        this.enterprise = enterprise
    }
} exports.SaveEnterpriseResponse = SaveEnterpriseResponse;

 class SaveEnterpriseParams {
    
    
    
    
    
    
    

    constructor(name, document_type, document, address,  logo_url, enterprise_id, category_id) {
        this.name = name
        this.document_type = document_type
        this.document = document
        this.address = address
        this.logo_url = logo_url
        this.enterprise_id = enterprise_id
        this.category_id = category_id
    }

} exports.SaveEnterpriseParams = SaveEnterpriseParams;