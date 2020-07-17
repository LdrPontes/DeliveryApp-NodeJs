import { UseCase } from "../../utils/UseCase";
import { OptionalProduct } from "../../entities/OptionalProduct";
import { IOptionalRepository } from "../../repositories/IOptionalRepository";
import { OptionalRepository } from "../../../data/repositories/OptionalRepository";

export class ReadOptionalUseCase extends UseCase<ReadOptionalResponse, ReadOptionalParams>{

    repository: IOptionalRepository = new OptionalRepository()

    async buildUseCase(params: ReadOptionalParams): Promise<ReadOptionalResponse> {
        try {

            const optional = await this.repository.read(params.id)

            return new ReadOptionalResponse(optional)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class ReadOptionalResponse {
    optional: OptionalProduct

    constructor(optional: OptionalProduct) {
        this.optional = optional
    }
}

export class ReadOptionalParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}