import { UseCase } from "../../utils/UseCase";
import { OptionalProduct } from "../../entities/OptionalProduct";
import { IOptionalRepository } from "../../repositories/IOptionalRepository";
import { OptionalRepository } from "../../../data/repositories/OptionalRepository";

export class UpdateOptionalUseCase extends UseCase<UpdateOptionalResponse, UpdateOptionalParams>{

    repository: IOptionalRepository = new OptionalRepository()

    async buildUseCase(params: UpdateOptionalParams): Promise<UpdateOptionalResponse> {
        try {
            
            const result = await this.repository.update(params.id, params.name, params.price, params.section_id)

            return new UpdateOptionalResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export class UpdateOptionalResponse {
    optional: OptionalProduct

    constructor(optional: OptionalProduct) {
        this.optional = optional
    }
}

export class UpdateOptionalParams {
    id: number
    name: string
    price: number
    section_id: number

    constructor(id: number, name: string, price: number, section_id: number) {
        this.id = id
        this.name = name
        this.price = price
        this.section_id = section_id
    }
}