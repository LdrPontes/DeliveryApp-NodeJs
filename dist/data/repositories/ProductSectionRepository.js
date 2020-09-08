"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _ProductSection = require('../../domain/entities/ProductSection');
var _typeorm = require('typeorm');

 class ProductionSectionRepository  {

    async save(name, enterprise_id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _ProductSection.ProductSection);

            const section = new (0, _ProductSection.ProductSection)()

            section.name = name
            section.enterprise_id = enterprise_id

            return await repository.save(section)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async read(id, search) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _ProductSection.ProductSection);

            return await repository.find({
                where: { enterprise_id: id, name: _typeorm.Like.call(void 0, `%${search}%`) }, join: {
                    alias: "product_section",
                    leftJoinAndSelect: {
                        "products": "product_section.products",
                        "optional_sections": "products.optional_sections"
                    }
                }, cache: true
            })



        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async update(id, name) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _ProductSection.ProductSection);

            const result = await repository.update(id, { name: name })

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async delete(id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _ProductSection.ProductSection);

            const result = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.ProductionSectionRepository = ProductionSectionRepository;