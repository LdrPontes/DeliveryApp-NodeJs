import { IOptionalRepository } from "../../domain/repositories/IOptionalRepository";
import { OptionalProduct } from "../../domain/entities/OptionalProduct";
import { getRepository } from "typeorm";

export class OptionalRepository implements IOptionalRepository {

    async save(name: string, price: number, enterprise_id: number, section_id: number): Promise<OptionalProduct> {
        try {

            const repository = getRepository(OptionalProduct);

            const optionalProduct = new OptionalProduct()

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

    async read(id: number): Promise<OptionalProduct> {
        try {

            const repository = getRepository(OptionalProduct);

            return await repository.findOneOrFail({ where: { id: id } })
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    update(id: number, name: string, price: number, section_id: number): Promise<OptionalProduct> {
        throw new Error("Method not implemented.");
    }
    
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}