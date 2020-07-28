import { UseCase } from "../../utils/UseCase";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/EnterpriseRepository";

export class DeleteEnterpriseUseCase extends UseCase<DeleteEnterpriseResponse, DeleteEnterpriseParams>{
    
    repository: IEnterpriseRepository = new EnterpriseRepository()


    async buildUseCase(params: DeleteEnterpriseParams): Promise<DeleteEnterpriseResponse> {
        try {

            const result = await this.repository.delete(params.id)

            return new DeleteEnterpriseResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class DeleteEnterpriseResponse {
    success: boolean

    constructor(success) {
        this.success = success
    }
}

export class DeleteEnterpriseParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}