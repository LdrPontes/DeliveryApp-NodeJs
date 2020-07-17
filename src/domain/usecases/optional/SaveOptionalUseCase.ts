import { UseCase } from "../../utils/UseCase";
import { OptionalProduct } from "../../entities/OptionalProduct";
import { OptionalRepository } from "../../../data/repositories/OptionalRepository";
import { IOptionalRepository } from "../../repositories/IOptionalRepository";

export class SaveOptionalUseCase extends UseCase<SaveOptionalResponse, SaveOptionalParams>{

    repository: IOptionalRepository = new OptionalRepository()

    async buildUseCase(params: SaveOptionalParams): Promise<SaveOptionalResponse> {
     
        try {
            
            const result = await this.repository.save(params.name, params.price, params.enterprise_id, params.section_id)

            return new SaveOptionalResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export class SaveOptionalResponse {
    optional: OptionalProduct

    constructor(optional: OptionalProduct) {
        this.optional = optional
    }
}

export class SaveOptionalParams {
    name: string
    price: number
    enterprise_id: number
    section_id: number

    constructor(name: string, price: number, enterprise_id: number, section_id: number) {
        this.name = name
        this.price = price
        this.enterprise_id = enterprise_id
        this.section_id = section_id
    }

}