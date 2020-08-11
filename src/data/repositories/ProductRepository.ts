import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { Product } from "../../domain/entities/Product";
import { getRepository } from "typeorm";
import { OptionalSection } from "../../domain/entities/OptionalSection";

export class ProductRepository implements IProductRepository {

    async save(title: string, description: string, img_url: string, price: number, enterprise_id: number, section_id: number, optional_sections: number[]): Promise<Product> {
        try {

            const repository = getRepository(Product);

            const product = new Product()

            product.title = title
            product.description = description
            product.img_url = img_url
            product.price = price
            product.enterprise_id = enterprise_id
            product.product_section_id = section_id

            const section = []
            for (const i of optional_sections) {
                const aux = new OptionalSection()
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

    async read(id: number): Promise<Product> {
        try {

            const repository = getRepository(Product);

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async update(id: number, title: string, description: string, img_url: string, price: number, section_id: number, optional_sections: number[]): Promise<Product> {
        try {

            const repository = getRepository(Product);

            const product = new Product()
            product.id = id

            //Verifica as relações atuais com as seções de opicionais 
            const actualRelationships = await getRepository(Product)
                .createQueryBuilder()
                .relation(Product, 'optional_sections')
                .of(product).loadMany();


            const section = []
            for (const i of optional_sections) {
                const aux = new OptionalSection()
                aux.id = i
                section.push(aux)
            }

            product.optional_sections = section

            //Atualiza com os novos opcionais
            await getRepository(Product)
                .createQueryBuilder()
                .relation(Product, 'optional_sections')
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

    async delete(id: number): Promise<boolean> {
        try {

            const repository = getRepository(Product);

            const result = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}