import { UseCase } from "../../utils/UseCase";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { EnterpriseRepository } from "../../../data/repositories/EnterpriseRepository";
import { EnterpriseSettings } from "../../entities/EnterpriseSettings";

export class UpdateEnterpriseSettingsUseCase extends UseCase<UpdateEnterpriseSettingsResponse, UpdateEnterpriseSettingsParams>{

    repository: IEnterpriseRepository = new EnterpriseRepository()

    async buildUseCase(params: UpdateEnterpriseSettingsParams): Promise<UpdateEnterpriseSettingsResponse> {
        try {
            
            const result = await this.repository.updateSettings(params.id, params.settings)

            return new UpdateEnterpriseSettingsResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export class UpdateEnterpriseSettingsResponse {
    success: boolean

    constructor(success: boolean) {
        this.success = success
    }
}

export class UpdateEnterpriseSettingsParams {
    settings: EnterpriseSettings
    id: number

    constructor(id: number, settings: EnterpriseSettings) {
        this.id = id
        this.settings = settings
    }
}