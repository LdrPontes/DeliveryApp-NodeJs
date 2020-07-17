import { UseCase } from "../../utils/UseCase";
import { ProductSection } from "../../entities/ProductSection";
import { IProductSectionRepository } from "../../repositories/IProductSectionRepository";
import { ProductionSectionRepository } from "../../../data/repositories/ProductSectionRepository";

export class ReadProductSectionUseCase extends UseCase<ReadProductSectionResponse, ReadProductSectionParams>{

    repository: IProductSectionRepository = new ProductionSectionRepository()

    async buildUseCase(params: ReadProductSectionParams): Promise<ReadProductSectionResponse> {
        try {

            const result = await this.repository.read(params.id)

            return new ReadProductSectionResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class ReadProductSectionResponse {
    section: ProductSection

    constructor(section: ProductSection) {
        this.section = section
    }
}

export class ReadProductSectionParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}