"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _OptionalRepository = require('../../../data/repositories/OptionalRepository');

 class DeleteOptionalUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); DeleteOptionalUseCase.prototype.__init.call(this); }
    
    __init() {this.repository = new (0, _OptionalRepository.OptionalRepository)()}


    async buildUseCase(params) {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteOptionalResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.DeleteOptionalUseCase = DeleteOptionalUseCase;

 class DeleteOptionalResponse {
    

    constructor(success) {
        this.success = success
    }
} exports.DeleteOptionalResponse = DeleteOptionalResponse;

 class DeleteOptionalParams {
    

    constructor(id) {
        this.id = id
    }
} exports.DeleteOptionalParams = DeleteOptionalParams;