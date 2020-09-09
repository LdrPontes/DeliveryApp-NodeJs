"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _Enterprise = require('../../domain/entities/Enterprise');
var _typeorm = require('typeorm');
var _EnterpriseUser = require('../../domain/entities/EnterpriseUser');




 class EnterpriseRepository  {

    async save(name, document_type, document, address, logo_url, enterprise_id, category_id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Enterprise.Enterprise);
            const repositoryUser = _typeorm.getRepository.call(void 0, _EnterpriseUser.EnterpriseUser);


            const enterprise = new (0, _Enterprise.Enterprise)()

            enterprise.name = name
            enterprise.document_type = document_type
            enterprise.document = document
            enterprise.address = address
            enterprise.logo_url = logo_url
            enterprise.category_id = category_id
            enterprise.enterprise_user_id = enterprise_id
            enterprise.code = name.toLowerCase().replace(/[^\w\s]/gi, '').replace(' ', '-')
            enterprise.settings = JSON.stringify({ "delivery": { "min_price": 0, "free_delivery_above": 0, "free_delivery_above_enabled": false, "delivery_fee_type": 0, "delivery_fee": 0, "delivery_time_start": 30, "delivery_time_end": 60, "pickup_on_site": true }, "enterprise": { "daily_works": [], "ask_cpf": false, "observation_enabled": true, "accept_money": true, "accept_credit_card": true, "accept_debit_card": true } })
            enterprise.catalog = JSON.stringify({"color":"#880e4f","start_msg":"Bem vindo!","end_msg":"Obrigado pela preferência!"})

            const result = await repository.save(enterprise)

            await repositoryUser.update(enterprise_id, { enterprise: enterprise })

            return result


        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async read(id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Enterprise.Enterprise);

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async readByCode(code) {
        try {
            const repository = _typeorm.getRepository.call(void 0, _Enterprise.Enterprise);
            const repositoryUser = _typeorm.getRepository.call(void 0, _EnterpriseUser.EnterpriseUser);

            const result = await repository.findOneOrFail(
                {
                    where: {
                        code: code
                    },
                    join: {
                        alias: "enterprise",
                        leftJoinAndSelect: {
                            "product_sections": "enterprise.product_sections",
                            "products": "product_sections.products",
                            "optional_sections": "products.optional_sections",
                            "optionals": "optional_sections.products",

                        }
                    }
                }
            )

            const user = await repositoryUser.findOneOrFail({ where: { id: result.enterprise_user_id }, select: ["telephone"] })

            result.user = user

            return result


        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async update(id, name, address, logo_url, category_id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Enterprise.Enterprise);

            const values = { name: name, address: address, logo_url: logo_url !== '' ? logo_url : undefined, category_id: category_id }

            await repository.update(id, JSON.parse(JSON.stringify(values)))

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateSettings(id, settings) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Enterprise.Enterprise);

            const result = await repository.update(id, { settings: JSON.stringify(settings) })

            return result.affected > 0

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateCatalog(id, catalog, code) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Enterprise.Enterprise);

            const result = await repository.update(id, { code: code, catalog: JSON.stringify(catalog) })

            return result.affected > 0

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async delete(id) {
        try {

            const repository = _typeorm.getRepository.call(void 0, _Enterprise.Enterprise);

            const result = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

} exports.EnterpriseRepository = EnterpriseRepository;