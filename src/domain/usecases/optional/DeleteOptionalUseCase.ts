import { UseCase } from "../../utils/UseCase";
import { IOptionalRepository } from "../../repositories/IOptionalRepository";
import { OptionalRepository } from "../../../data/repositories/OptionalRepository";

export class DeleteOptionalUseCase extends UseCase<DeleteOptionalResponse, DeleteOptionalParams>{
    
    repository: IOptionalRepository = new OptionalRepository()


    async buildUseCase(params: DeleteOptionalParams): Promise<DeleteOptionalResponse> {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteOptionalResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class DeleteOptionalResponse {
    success: boolean

    constructor(success) {
        this.success = success
    }
}

export class DeleteOptionalParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}