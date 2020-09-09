"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _ProductSectionRepository = require('../../../data/repositories/ProductSectionRepository');


 class UpdateProductSectionUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); UpdateProductSectionUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _ProductSectionRepository.ProductionSectionRepository)()}


    async buildUseCase(params) {
        try {
            
            const result = await this.repository.update(params.id, params.name)

            return new UpdateProductSectionResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.UpdateProductSectionUseCase = UpdateProductSectionUseCase;

 class UpdateProductSectionResponse {
    

    constructor(section) {
        this.section = section
    }
} exports.UpdateProductSectionResponse = UpdateProductSectionResponse;

 class UpdateProductSectionParams {
    
    

    constructor(id, name) {
        this.id = id
        this.name = name
    }
} exports.UpdateProductSectionParams = UpdateProductSectionParams;