"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _ProductSectionRepository = require('../../../data/repositories/ProductSectionRepository');

 class SaveProductSectionUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); SaveProductSectionUseCase.prototype.__init.call(this); }
    
    __init() {this.repository = new (0, _ProductSectionRepository.ProductionSectionRepository)()}
    
    async buildUseCase(params) {
        try {
    
            const result = await this.repository.save(params.name, params.enterprise_id)

            return new SaveProductSectionResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }    
    }

} exports.SaveProductSectionUseCase = SaveProductSectionUseCase;

 class SaveProductSectionResponse {
    

    constructor(section) {
        this.section = section
    }
} exports.SaveProductSectionResponse = SaveProductSectionResponse;

 class SaveProductSectionParams {
    
    

    constructor(name, enterprise_id) {
        this.name = name
        this.enterprise_id = enterprise_id
    }
} exports.SaveProductSectionParams = SaveProductSectionParams;