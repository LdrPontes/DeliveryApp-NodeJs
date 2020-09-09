"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _OptionalProduct = require('../../domain/entities/OptionalProduct');
var _typeorm = require('typeorm');

 class OptionalRepository  {

    async save(name, price, enterprise_id, section_id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _OptionalProduct.OptionalProduct);

            const optionalProduct = new (0, _OptionalProduct.OptionalProduct)()

            optionalProduct.name = name
            optionalProduct.price = price
            optionalProduct.enterprise_id = enterprise_id
            optionalProduct.optional_section_id = section_id

            return await repository.save(optionalProduct)
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async read(id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _OptionalProduct.OptionalProduct);

            return await repository.findOneOrFail({ where: { id: id } })
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async update(id, name, price, section_id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _OptionalProduct.OptionalProduct);

            const result = await repository.update(id, { name: name, price: price })

         

            return await repository.findOneOrFail({ where: { id: id } })
        
        } catch (error) {   
            console.log(error)
            throw error
        }
    }
    
    async delete(id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _OptionalProduct.OptionalProduct);

            const result  = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.OptionalRepository = OptionalRepository;