"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _ProductRepository = require('../../../data/repositories/ProductRepository');

 class ReadProductUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); ReadProductUseCase.prototype.__init.call(this); }
    
    __init() {this.repository = new (0, _ProductRepository.ProductRepository)()}

    async buildUseCase(params) {
        try {

            const result = await this.repository.read(params.id)

            return new ReadProductResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.ReadProductUseCase = ReadProductUseCase;

 class ReadProductResponse {
    

    constructor(product) {
        this.product = product
    }
} exports.ReadProductResponse = ReadProductResponse;

 class ReadProductParams {
    

    constructor(id) {
        this.id = id
    }
} exports.ReadProductParams = ReadProductParams;