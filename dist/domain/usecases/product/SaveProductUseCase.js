"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _ProductRepository = require('../../../data/repositories/ProductRepository');

 class SaveProductUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); SaveProductUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _ProductRepository.ProductRepository)()}

    async buildUseCase(params) {
        try {

            const result = await this.repository.save(params.title, params.description, params.img_url, params.price, params.enterprise_id, params.section_id, params.optional_sections)

            return new SaveProductResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.SaveProductUseCase = SaveProductUseCase;

 class SaveProductResponse {
    

    constructor(product) {
        this.product = product
    }
} exports.SaveProductResponse = SaveProductResponse;

 class SaveProductParams {
    
    
    
    
    
    
    

    constructor(title, description, img_url, price, enterprise_id, section_id, optional_sections) {
        this.title = title
        this.description = description
        this.img_url = img_url
        this.price = price
        this.enterprise_id = enterprise_id
        this.section_id = section_id
        this.optional_sections = optional_sections
    }
} exports.SaveProductParams = SaveProductParams;