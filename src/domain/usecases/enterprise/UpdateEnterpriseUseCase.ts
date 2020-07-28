import { UseCase } from "../../utils/UseCase";
import { Enterprise } from "../../entities/Enterprise";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/EnterpriseRepository";

export class UpdateEnterpriseUseCase extends UseCase<UpdateEnterpriseResponse, UpdateEnterpriseParams>{

    repository: IEnterpriseRepository = new EnterpriseRepository()

    async buildUseCase(params: UpdateEnterpriseParams): Promise<UpdateEnterpriseResponse> {
        try {
            
            const result = await this.repository.update(params.id, params.name, params.address, params.logo_url, params.category_id)

            return new UpdateEnterpriseResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export class UpdateEnterpriseResponse {
    enterprise: Enterprise

    constructor(enterprise: Enterprise) {
        this.enterprise = enterprise
    }
}

export class UpdateEnterpriseParams {
    id: number
    name: string
    logo_url: string
    address: string
    category_id: number

    constructor(id: number, name: string, address: string, logo_url: string, category_id: number) {
        this.id = id
        this.name = name
        this.logo_url = logo_url
        this.address = address
        this.category_id = category_id
    }
}