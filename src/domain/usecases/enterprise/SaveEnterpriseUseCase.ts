import { UseCase } from "../../utils/UseCase";
import { Enterprise } from "../../entities/Enterprise";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/EnterpriseRepository";

export class SaveEnterpriseUseCase extends UseCase<SaveEnterpriseResponse, SaveEnterpriseParams>{

    repository: IEnterpriseRepository = new EnterpriseRepository()

    async buildUseCase(params: SaveEnterpriseParams): Promise<SaveEnterpriseResponse> {
     
        try {
            
            const result = await this.repository.save(params.name, params.document_type, params.document, params.address, params.logo_url, params.enterprise_id, params.category_id)

            return new SaveEnterpriseResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export class SaveEnterpriseResponse {
    enterprise: Enterprise

    constructor(enterprise: Enterprise) {
        this.enterprise = enterprise
    }
}

export class SaveEnterpriseParams {
    name: string
    document_type: number
    document: string
    address: string
    logo_url: string
    enterprise_id: number
    category_id: number

    constructor(name: string, document_type: number, document: string, address: string,  logo_url: string, enterprise_id: number, category_id: number) {
        this.name = name
        this.document_type = document_type
        this.document = document
        this.address = address
        this.logo_url = logo_url
        this.enterprise_id = enterprise_id
        this.category_id = category_id
    }

}