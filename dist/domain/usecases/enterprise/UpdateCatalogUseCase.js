"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _EnterpriseRepository = require('../../../data/repositories/EnterpriseRepository');


 class UpdateEnterpriseCatalogUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); UpdateEnterpriseCatalogUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _EnterpriseRepository.EnterpriseRepository)()}

    async buildUseCase(params) {
        try {
            
            const result = await this.repository.updateCatalog(params.id, params.catalog, params.code)

            return new UpdateEnterpriseCatalogResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.UpdateEnterpriseCatalogUseCase = UpdateEnterpriseCatalogUseCase;

 class UpdateEnterpriseCatalogResponse {
    

    constructor(success) {
        this.success = success
    }
} exports.UpdateEnterpriseCatalogResponse = UpdateEnterpriseCatalogResponse;

 class UpdateEnterpriseCatalogParams {
    
    
    

    constructor(id, catalog, code) {
        this.id = id
        this.catalog = catalog
        this.code = code
    }
} exports.UpdateEnterpriseCatalogParams = UpdateEnterpriseCatalogParams;