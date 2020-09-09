"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _OptionalSectionRepository = require('../../../data/repositories/OptionalSectionRepository');

 class ReadOptionalSectionUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); ReadOptionalSectionUseCase.prototype.__init.call(this); }
    
    __init() {this.repository = new (0, _OptionalSectionRepository.OptionalSectionRepository)()}


    async buildUseCase(params) {
        try {

            const result = await this.repository.read(params.id, params.search)

            return new ReadOptionalSectionResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.ReadOptionalSectionUseCase = ReadOptionalSectionUseCase;

 class ReadOptionalSectionResponse {
    

    constructor(sections) {
        this.sections = sections
    }
} exports.ReadOptionalSectionResponse = ReadOptionalSectionResponse;

 class ReadOptionalSectionParams {
    
    

    constructor(id, search) {
        this.id = id
        this.search = search
    }
} exports.ReadOptionalSectionParams = ReadOptionalSectionParams;