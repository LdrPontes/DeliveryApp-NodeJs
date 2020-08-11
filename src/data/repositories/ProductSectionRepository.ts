import { IProductSectionRepository } from "../../domain/repositories/IProductSectionRepository";
import { ProductSection } from "../../domain/entities/ProductSection";
import { getRepository, Like } from "typeorm";

export class ProductionSectionRepository implements IProductSectionRepository {

    async save(name: string, enterprise_id: number): Promise<ProductSection> {
        try {

            const repository = getRepository(ProductSection);

            const section = new ProductSection()

            section.name = name
            section.enterprise_id = enterprise_id

            return await repository.save(section)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async read(id: number, search: string): Promise<ProductSection[]> {
        try {

            const repository = getRepository(ProductSection);

            return await repository.find({
                where: { enterprise_id: id, name: Like(`%${search}%`) }, join: {
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

    async update(id: number, name: string): Promise<ProductSection> {
        try {

            const repository = getRepository(ProductSection);

            const result = await repository.update(id, { name: name })

            return await repository.findOneOrFail({ where: { id: id } })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async delete(id: number): Promise<boolean> {
        try {

            const repository = getRepository(ProductSection);

            const result = await repository.delete(id)

            return result.affected > 0
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}