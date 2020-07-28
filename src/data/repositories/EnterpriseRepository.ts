import { IEnterpriseRepository } from "../../domain/repositories/IEnterpriseRepository";
import { Enterprise } from "../../domain/entities/Enterprise";
import { getRepository } from "typeorm";


export class EnterpriseRepository implements IEnterpriseRepository {
    async save(name: string, document_type: number, document: string, address: string, logo_url: string, enterprise_id: number, category_id: number): Promise<Enterprise> {
        try {

            const repository = getRepository(Enterprise);

            const enterprise = new Enterprise()

            enterprise.name = name
            enterprise.document_type = document_type
            enterprise.document = document
            enterprise.address = address
            enterprise.logo_url = logo_url
            enterprise.enterprise_id = enterprise_id
            enterprise.category_id = category_id

            return await repository.save(enterprise)

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

    async update(id: number, name: string, address: string, logo_url: string, category_id: number): Promise<Enterprise> {
        try {

            const repository = getRepository(Enterprise);

            const result = await repository.update(id, { name: name, address: address, logo_url: logo_url, category_id: category_id })

            return await repository.findOneOrFail({ where: { id: id } })

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