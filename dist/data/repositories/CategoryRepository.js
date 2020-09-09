"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _Category = require('../../domain/entities/Category');
var _typeorm = require('typeorm');

 class CategoryRepository  {
    
    async readAll() {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Category.Category);

            return await repository.find()

        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.CategoryRepository = CategoryRepository;