"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _UseCase = require('../../utils/UseCase');


var _CategoryRepository = require('../../../data/repositories/CategoryRepository');

 class ReadAllCategoryUseCase extends _UseCase.UseCase{constructor(...args) { super(...args); ReadAllCategoryUseCase.prototype.__init.call(this); }

    __init() {this.repository = new (0, _CategoryRepository.CategoryRepository)()}

    async buildUseCase(params) {
        return new ReadAllCategoryResponse(await this.repository.readAll())
    }
} exports.ReadAllCategoryUseCase = ReadAllCategoryUseCase;

 class ReadAllCategoryResponse {
    

    constructor(categories){
        this.categories = categories
    }
} exports.ReadAllCategoryResponse = ReadAllCategoryResponse;