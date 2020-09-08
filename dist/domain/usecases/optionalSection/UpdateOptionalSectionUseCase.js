"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _OptionalSectionRepository = require('../../../data/repositories/OptionalSectionRepository');


 class UpdateOptionalSectionUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); UpdateOptionalSectionUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _OptionalSectionRepository.OptionalSectionRepository)()}
    
    async buildUseCase(params) {
        try {
            
            const result = await this.repository.update(params.id, params.name, params.min, params.max)

            return new UpdateOptionalSectionResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.UpdateOptionalSectionUseCase = UpdateOptionalSectionUseCase;

 class UpdateOptionalSectionResponse {
    

    constructor(section) {
        this.section = section
    }
} exports.UpdateOptionalSectionResponse = UpdateOptionalSectionResponse;

 class UpdateOptionalSectionParams {
    
    
    
    

    constructor(id, name, min, max) {
        this.id = id
        this.name = name
        this.min = min
        this.max = max
    }
} exports.UpdateOptionalSectionParams = UpdateOptionalSectionParams;