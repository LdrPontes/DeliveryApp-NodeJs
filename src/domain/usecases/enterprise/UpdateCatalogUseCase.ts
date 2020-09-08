import { UseCase } from "../../utils/UseCase";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/EnterpriseRepository";
import { EnterpriseCatalog } from "../../entities/EnterpriseCatalog";

export class UpdateEnterpriseCatalogUseCase extends UseCase<UpdateEnterpriseCatalogResponse, UpdateEnterpriseCatalogParams>{

    repository: IEnterpriseRepository = new EnterpriseRepository()

    async buildUseCase(params: UpdateEnterpriseCatalogParams): Promise<UpdateEnterpriseCatalogResponse> {
        try {
            
            const result = await this.repository.updateCatalog(params.id, params.catalog, params.code)

            return new UpdateEnterpriseCatalogResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export class UpdateEnterpriseCatalogResponse {
    success: boolean

    constructor(success: boolean) {
        this.success = success
    }
}

export class UpdateEnterpriseCatalogParams {
    catalog: EnterpriseCatalog
    code: string
    id: number

    constructor(id: number, catalog: EnterpriseCatalog, code: string) {
        this.id = id
        this.catalog = catalog
        this.code = code
    }
}