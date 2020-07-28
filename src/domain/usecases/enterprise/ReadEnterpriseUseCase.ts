import { UseCase } from "../../utils/UseCase";
import { Enterprise } from "../../entities/Enterprise";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/EnterpriseRepository";

export class ReadEnterpriseUseCase extends UseCase<ReadEnterpriseResponse, ReadEnterpriseParams>{

    repository: IEnterpriseRepository = new EnterpriseRepository()

    async buildUseCase(params: ReadEnterpriseParams): Promise<ReadEnterpriseResponse> {
        try {

            const result = await this.repository.read(params.id)

            return new ReadEnterpriseResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class ReadEnterpriseResponse {
    enterprise: Enterprise

    constructor(enterprise: Enterprise) {
        this.enterprise = enterprise
    }
}

export class ReadEnterpriseParams {
    id: number

    constructor(id: number) {
        this.id = id
    }
}