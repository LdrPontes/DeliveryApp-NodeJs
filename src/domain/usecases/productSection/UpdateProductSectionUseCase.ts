import { UseCase } from "../../utils/UseCase";
import { IProductSectionRepository } from "../../repositories/IProductSectionRepository";
import { ProductionSectionRepository } from "../../../data/repositories/ProductSectionRepository";
import { ProductSection } from "../../entities/ProductSection";

export class UpdateProductSectionUseCase extends UseCase<UpdateProductSectionResponse, UpdateProductSectionParams>{

    repository: IProductSectionRepository = new ProductionSectionRepository()


    async buildUseCase(params: UpdateProductSectionParams): Promise<UpdateProductSectionResponse> {
        try {
            
            const result = await this.repository.update(params.id, params.name)

            return new UpdateProductSectionResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export class UpdateProductSectionResponse {
    section: ProductSection

    constructor(section: ProductSection) {
        this.section = section
    }
}

export class UpdateProductSectionParams {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
}