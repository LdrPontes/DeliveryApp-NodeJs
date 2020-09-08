"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _ProductRepository = require('../../../data/repositories/ProductRepository');

 class DeleteProductUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); DeleteProductUseCase.prototype.__init.call(this); }
    
    __init() {this.repository = new (0, _ProductRepository.ProductRepository)()}

    async buildUseCase(params) {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteProductResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.DeleteProductUseCase = DeleteProductUseCase;

 class DeleteProductResponse {
    

    constructor(success) {
        this.success = success
    }
} exports.DeleteProductResponse = DeleteProductResponse;

 class DeleteProductParams {
    

    constructor(id) {
        this.id = id
    }
} exports.DeleteProductParams = DeleteProductParams;