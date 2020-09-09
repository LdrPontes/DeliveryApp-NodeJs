"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _OptionalRepository = require('../../../data/repositories/OptionalRepository');

 class UpdateOptionalUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); UpdateOptionalUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _OptionalRepository.OptionalRepository)()}

    async buildUseCase(params) {
        try {
            
            const result = await this.repository.update(params.id, params.name, params.price, params.section_id)

            return new UpdateOptionalResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.UpdateOptionalUseCase = UpdateOptionalUseCase;

 class UpdateOptionalResponse {
    

    constructor(optional) {
        this.optional = optional
    }
} exports.UpdateOptionalResponse = UpdateOptionalResponse;

 class UpdateOptionalParams {
    
    
    
    

    constructor(id, name, price, section_id) {
        this.id = id
        this.name = name
        this.price = price
        this.section_id = section_id
    }
} exports.UpdateOptionalParams = UpdateOptionalParams;