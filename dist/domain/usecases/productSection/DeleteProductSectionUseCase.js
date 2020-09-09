"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _ProductSectionRepository = require('../../../data/repositories/ProductSectionRepository');

 class DeleteProductSectionUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); DeleteProductSectionUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _ProductSectionRepository.ProductionSectionRepository)()}
    
    async buildUseCase(params) {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteProductSectionResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.DeleteProductSectionUseCase = DeleteProductSectionUseCase;

 class DeleteProductSectionResponse {
    

    constructor(success) {
        this.success = success
    }
} exports.DeleteProductSectionResponse = DeleteProductSectionResponse;

 class DeleteProductSectionParams {
    

    constructor(id) {
        this.id = id
    }
} exports.DeleteProductSectionParams = DeleteProductSectionParams;