import { UseCase } from "../../utils/UseCase";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ProductRepository } from "../../../data/repositories/ProductRepository";

export class DeleteProductUseCase extends UseCase<DeleteProductResponse, DeleteProductParams>{
    
    repository: IProductRepository = new ProductRepository()

    async buildUseCase(params: DeleteProductParams): Promise<DeleteProductResponse> {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteProductResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class DeleteProductResponse {
    success: boolean

    constructor(success) {
        this.success = success
    }
}

export class DeleteProductParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}