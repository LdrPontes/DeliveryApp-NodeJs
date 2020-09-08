"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _ProductRepository = require('../../../data/repositories/ProductRepository');


 class UpdateProductUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); UpdateProductUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _ProductRepository.ProductRepository)()}

    async buildUseCase(params) {
        try {

            const result = await this.repository.update(params.id, params.title, params.description, params.img_url, params.price, params.section_id, params.optional_sections)

            return new UpdateProductResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.UpdateProductUseCase = UpdateProductUseCase;

 class UpdateProductResponse {
    

    constructor(product) {
        this.product = product
    }
} exports.UpdateProductResponse = UpdateProductResponse;

 class UpdateProductParams {
    
    
    
    
    
    
    

    constructor(id, title, description, img_url, price, section_id, optional_sections) {
        this.id = id
        this.title = title
        this.description = description
        this.img_url = img_url
        this.price = price
        this.section_id = section_id
        this.optional_sections = optional_sections
    }
} exports.UpdateProductParams = UpdateProductParams;