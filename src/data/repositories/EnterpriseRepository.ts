import { IEnterpriseRepository } from "../../domain/repositories/IEnterpriseRepository";
import { Enterprise } from "../../domain/entities/Enterprise";
import { getRepository } from "typeorm";
import { EnterpriseUser } from "../../domain/entities/EnterpriseUser";
import { EnterpriseSettings } from "../../domain/entities/EnterpriseSettings";
import { EnterpriseCatalog } from "../../domain/entities/EnterpriseCatalog";


export class EnterpriseRepository implements IEnterpriseRepository {

    async save(name: string, document_type: number, document: string, address: string, logo_url: string, enterprise_id: number, category_id: number): Promise<Enterprise> {
        try {

            const repository = getRepository(Enterprise);
            const repositoryUser = getRepository(EnterpriseUser);


            const enterprise = new Enterprise()

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

    async read(id: number): Promise<Enterprise> {
        try {

            const repository = getRepository(Enterprise);

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async readByCode(code: string): Promise<Enterprise> {
        try {
            const repository = getRepository(Enterprise);
            const repositoryUser = getRepository(EnterpriseUser);

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

    async update(id: number, name: string, address: string, logo_url: string, category_id: number): Promise<Enterprise> {
        try {

            const repository = getRepository(Enterprise);

            const values = { name: name, address: address, logo_url: logo_url !== '' ? logo_url : undefined, category_id: category_id }

            await repository.update(id, JSON.parse(JSON.stringify(values)))

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateSettings(id: number, settings: EnterpriseSettings): Promise<boolean> {
        try {

            const repository = getRepository(Enterprise);

            const result = await repository.update(id, { settings: JSON.stringify(settings) })

            return result.affected > 0

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateCatalog(id: number, catalog: EnterpriseCatalog, code: string): Promise<boolean> {
        try {

            const repository = getRepository(Enterprise);

            const result = await repository.update(id, { code: code, catalog: JSON.stringify(catalog) })

            return result.affected > 0

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async delete(id: number): Promise<boolean> {
        try {

            const repository = getRepository(Enterprise);

            const result = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}