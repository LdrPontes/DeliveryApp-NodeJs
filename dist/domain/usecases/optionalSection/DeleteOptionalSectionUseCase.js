"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');

var _OptionalSectionRepository = require('../../../data/repositories/OptionalSectionRepository');

 class DeleteOptionalSectionUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); DeleteOptionalSectionUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _OptionalSectionRepository.OptionalSectionRepository)()}
    
    async buildUseCase(params) {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteOptionalSectionResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

} exports.DeleteOptionalSectionUseCase = DeleteOptionalSectionUseCase;

 class DeleteOptionalSectionResponse {
    

    constructor(success) {
        this.success = success
    }
} exports.DeleteOptionalSectionResponse = DeleteOptionalSectionResponse;

 class DeleteOptionalSectionParams {
    

    constructor(id) {
        this.id = id
    }
} exports.DeleteOptionalSectionParams = DeleteOptionalSectionParams;