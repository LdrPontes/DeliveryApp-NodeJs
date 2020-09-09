"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _ProductSectionRepository = require('../../../data/repositories/ProductSectionRepository');

 class ReadProductSectionUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); ReadProductSectionUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _ProductSectionRepository.ProductionSectionRepository)()}

    async buildUseCase(params) {
        try {

            const result = await this.repository.read(params.id, params.search)

            return new ReadProductSectionResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.ReadProductSectionUseCase = ReadProductSectionUseCase;

 class ReadProductSectionResponse {
    

    constructor(sections) {
        this.sections = sections
    }
} exports.ReadProductSectionResponse = ReadProductSectionResponse;

 class ReadProductSectionParams {
    
    

    constructor(id, search) {
        this.id = id
        this.search = search
    }
} exports.ReadProductSectionParams = ReadProductSectionParams;