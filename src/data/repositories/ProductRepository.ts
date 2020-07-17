import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { Product } from "../../domain/entities/Product";
import { getRepository } from "typeorm";

export class ProductRepository implements IProductRepository {

    async save(title: string, description: string, img_url: string, price: number, enterprise_id: number, section_id: number): Promise<Product> {
        try {

            const repository = getRepository(Product);

            const product = new Product()

            product.title = title
            product.description = description
            product.img_url = img_url
            product.price = price
            product.enterprise_id = enterprise_id
            product.product_section_id = section_id

            return await repository.save(product)

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

    async update(id: number, title: string, description: string, img_url: string, price: number, section_id: number): Promise<Product> {
        try {

            const repository = getRepository(Product);

            const result = await repository.update(id, { title: title, description: description, img_url: img_url, price: price, product_section_id: section_id })

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async delete(id: number): Promise<boolean> {
        try {

            const repository = getRepository(Product);

            const result  = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}