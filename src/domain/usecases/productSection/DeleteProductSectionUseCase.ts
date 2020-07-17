import { UseCase } from "../../utils/UseCase";
import { IProductSectionRepository } from "../../repositories/IProductSectionRepository";
import { ProductionSectionRepository } from "../../../data/repositories/ProductSectionRepository";

export class DeleteProductSectionUseCase extends UseCase<DeleteProductSectionResponse, DeleteProductSectionParams>{

    repository: IProductSectionRepository = new ProductionSectionRepository()
    
    async buildUseCase(params: DeleteProductSectionParams): Promise<DeleteProductSectionResponse> {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteProductSectionResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class DeleteProductSectionResponse {
    success: boolean

    constructor(success) {
        this.success = success
    }
}

export class DeleteProductSectionParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}