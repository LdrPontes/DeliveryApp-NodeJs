"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _OptionalSection = require('../../domain/entities/OptionalSection');
var _typeorm = require('typeorm');

 class OptionalSectionRepository  {

    async save(name, enterprise_id, min, max) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _OptionalSection.OptionalSection);

            const section = new (0, _OptionalSection.OptionalSection)()

            section.name = name
            section.enterprise_id = enterprise_id
            section.min = min
            section.max = max

            return await repository.save(section)
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async read(id, search) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _OptionalSection.OptionalSection);

            return await repository.find({ where: { enterprise_id: id, name: _typeorm.Like.call(void 0, `%${search}%`) }, relations: ["products"], cache: true})
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async update(id, name, min, max) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _OptionalSection.OptionalSection);

            const result = await repository.update(id, { name: name, min: min, max: max })

            return await repository.findOneOrFail({ where: { id: id } })
        
        } catch (error) {   
            console.log(error)
            throw error
        }
    }
    
    async delete(id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _OptionalSection.OptionalSection);

            const result  = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.OptionalSectionRepository = OptionalSectionRepository;