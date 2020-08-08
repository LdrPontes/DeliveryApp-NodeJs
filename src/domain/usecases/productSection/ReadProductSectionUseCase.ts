import { UseCase } from "../../utils/UseCase";
import { ProductSection } from "../../entities/ProductSection";
import { IProductSectionRepository } from "../../repositories/IProductSectionRepository";
import { ProductionSectionRepository } from "../../../data/repositories/ProductSectionRepository";

export class ReadProductSectionUseCase extends UseCase<ReadProductSectionResponse, ReadProductSectionParams>{

    repository: IProductSectionRepository = new ProductionSectionRepository()

    async buildUseCase(params: ReadProductSectionParams): Promise<ReadProductSectionResponse> {
        try {

            const result = await this.repository.read(params.id, params.search)

            return new ReadProductSectionResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class ReadProductSectionResponse {
    sections: ProductSection[]

    constructor(sections: ProductSection[]) {
        this.sections = sections
    }
}

export class ReadProductSectionParams {
    id: number
    search: string

    constructor(id: number, search: string) {
        this.id = id
        this.search = search
    }
}