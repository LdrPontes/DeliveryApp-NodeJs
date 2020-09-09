"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _OptionalRepository = require('../../../data/repositories/OptionalRepository');


 class SaveOptionalUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); SaveOptionalUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _OptionalRepository.OptionalRepository)()}

    async buildUseCase(params) {
     
        try {
            
            const result = await this.repository.save(params.name, params.price, params.enterprise_id, params.section_id)

            return new SaveOptionalResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }
} exports.SaveOptionalUseCase = SaveOptionalUseCase;

 class SaveOptionalResponse {
    

    constructor(optional) {
        this.optional = optional
    }
} exports.SaveOptionalResponse = SaveOptionalResponse;

 class SaveOptionalParams {
    
    
    
    

    constructor(name, price, enterprise_id, section_id) {
        this.name = name
        this.price = price
        this.enterprise_id = enterprise_id
        this.section_id = section_id
    }

} exports.SaveOptionalParams = SaveOptionalParams;