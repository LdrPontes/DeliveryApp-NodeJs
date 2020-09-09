"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _Product = require('../../domain/entities/Product');
var _typeorm = require('typeorm');
var _OptionalSection = require('../../domain/entities/OptionalSection');

 class ProductRepository  {

    async save(title, description, img_url, price, enterprise_id, section_id, optional_sections) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Product.Product);

            const product = new (0, _Product.Product)()

            product.title = title
            product.description = description
            product.img_url = img_url
            product.price = price
            product.enterprise_id = enterprise_id
            product.product_section_id = section_id

            const section = []
            for (const i of optional_sections) {
                const aux = new (0, _OptionalSection.OptionalSection)()
                aux.id = i
                section.push(aux)
            }

            product.optional_sections = section

            const result = await repository.save(product)

            return await repository.findOneOrFail({ where: { id: result.id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async read(id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Product.Product);

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async update(id, title, description, img_url, price, section_id, optional_sections) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Product.Product);

            const product = new (0, _Product.Product)()
            product.id = id

            //Verifica as relações atuais com as seções de opicionais 
            const actualRelationships = await _typeorm.getRepository.call(void 0, _Product.Product)
                .createQueryBuilder()
                .relation(_Product.Product, 'optional_sections')
                .of(product).loadMany();


            const section = []
            for (const i of optional_sections) {
                const aux = new (0, _OptionalSection.OptionalSection)()
                aux.id = i
                section.push(aux)
            }

            product.optional_sections = section

            //Atualiza com os novos opcionais
            await _typeorm.getRepository.call(void 0, _Product.Product)
                .createQueryBuilder()
                .relation(_Product.Product, 'optional_sections')
                .of(product)
                .addAndRemove(product.optional_sections, actualRelationships);


            //Atualiza os dados do produto
            const values = { title: title, description: description, img_url: (img_url !== '' && img_url !== null && img_url !== undefined) ? img_url : undefined, price: price, product_section_id: section_id }
            
            await repository.update(id, JSON.parse(JSON.stringify(values)))

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async delete(id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Product.Product);

            const result = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.ProductRepository = ProductRepository;