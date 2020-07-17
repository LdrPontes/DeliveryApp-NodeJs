import { UseCase } from "../../utils/UseCase";
import { IOptionalSectionRepository } from "../../repositories/IOptionalSectionRepository";
import { OptionalSectionRepository } from "../../../data/repositories/OptionalSectionRepository";

export class DeleteOptionalSectionUseCase extends UseCase<DeleteOptionalSectionResponse, DeleteOptionalSectionParams>{

    repository: IOptionalSectionRepository = new OptionalSectionRepository()
    
    async buildUseCase(params: DeleteOptionalSectionParams): Promise<DeleteOptionalSectionResponse> {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteOptionalSectionResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class DeleteOptionalSectionResponse {
    success: boolean

    constructor(success) {
        this.success = success
    }
}

export class DeleteOptionalSectionParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}