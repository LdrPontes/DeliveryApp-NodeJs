import { UseCase } from "../../utils/UseCase";
import { ProductSection } from "../../entities/ProductSection";
import { IProductSectionRepository } from "../../repositories/IProductSectionRepository";
import { ProductionSectionRepository } from "../../../data/repositories/ProductSectionRepository";

export class SaveProductSectionUseCase extends UseCase<SaveProductSectionResponse, SaveProductSectionParams>{
    
    repository: IProductSectionRepository = new ProductionSectionRepository()
    
    async buildUseCase(params: SaveProductSectionParams): Promise<SaveProductSectionResponse> {
        try {
    
            const result = await this.repository.save(params.name, params.enterprise_id)

            return new SaveProductSectionResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }    
    }

}

export class SaveProductSectionResponse {
    section: ProductSection

    constructor(section: ProductSection) {
        this.section = section
    }
}

export class SaveProductSectionParams {
    name: string
    enterprise_id: number

    constructor(name: string, enterprise_id: number) {
        this.name = name
        this.enterprise_id = enterprise_id
    }
}