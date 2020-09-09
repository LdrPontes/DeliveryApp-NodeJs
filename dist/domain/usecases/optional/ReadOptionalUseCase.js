"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _OptionalRepository = require('../../../data/repositories/OptionalRepository');

 class ReadOptionalUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); ReadOptionalUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _OptionalRepository.OptionalRepository)()}

    async buildUseCase(params) {
        try {

            const result = await this.repository.read(params.id)

            return new ReadOptionalResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.ReadOptionalUseCase = ReadOptionalUseCase;

 class ReadOptionalResponse {
    

    constructor(optional) {
        this.optional = optional
    }
} exports.ReadOptionalResponse = ReadOptionalResponse;

 class ReadOptionalParams {
    

    constructor(id) {
        this.id = id
    }
} exports.ReadOptionalParams = ReadOptionalParams;