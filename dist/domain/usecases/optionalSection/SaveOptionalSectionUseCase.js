"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _OptionalSectionRepository = require('../../../data/repositories/OptionalSectionRepository');

 class SaveOptionalSectionUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); SaveOptionalSectionUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _OptionalSectionRepository.OptionalSectionRepository)()}

    async buildUseCase(params) {
       
        try {
    
            const result = await this.repository.save(params.name, params.enterprise_id, params.min, params.max)

            return new SaveOptionalSectionResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.SaveOptionalSectionUseCase = SaveOptionalSectionUseCase;

 class SaveOptionalSectionResponse {
    

    constructor(section) {
        this.section = section
    }
} exports.SaveOptionalSectionResponse = SaveOptionalSectionResponse;

 class SaveOptionalSectionParams {
    
    
    
    

    constructor(name, enterprise_id, min, max) {
        this.name = name
        this.enterprise_id = enterprise_id
        this.min = min
        this.max = max
    }
} exports.SaveOptionalSectionParams = SaveOptionalSectionParams;