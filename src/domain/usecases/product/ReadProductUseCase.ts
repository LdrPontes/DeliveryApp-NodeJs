import { UseCase } from "../../utils/UseCase";
import { Product } from "../../entities/Product";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ProductRepository } from "../../../data/repositories/ProductRepository";

export class ReadProductUseCase extends UseCase<ReadProductResponse, ReadProductParams>{
    
    repository: IProductRepository = new ProductRepository()

    async buildUseCase(params: ReadProductParams): Promise<ReadProductResponse> {
        try {

            const result = await this.repository.read(params.id)

            return new ReadProductResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class ReadProductResponse {
    product: Product

    constructor(product: Product) {
        this.product = product
    }
}

export class ReadProductParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}