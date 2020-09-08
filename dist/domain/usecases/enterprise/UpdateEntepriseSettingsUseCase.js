"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _EnterpriseRepository = require('../../../data/repositories/EnterpriseRepository');


 class UpdateEnterpriseSettingsUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); UpdateEnterpriseSettingsUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _EnterpriseRepository.EnterpriseRepository)()}

    async buildUseCase(params) {
        try {
            
            const result = await this.repository.updateSettings(params.id, params.settings)

            return new UpdateEnterpriseSettingsResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.UpdateEnterpriseSettingsUseCase = UpdateEnterpriseSettingsUseCase;

 class UpdateEnterpriseSettingsResponse {
    

    constructor(success) {
        this.success = success
    }
} exports.UpdateEnterpriseSettingsResponse = UpdateEnterpriseSettingsResponse;

 class UpdateEnterpriseSettingsParams {
    
    

    constructor(id, settings) {
        this.id = id
        this.settings = settings
    }
} exports.UpdateEnterpriseSettingsParams = UpdateEnterpriseSettingsParams;