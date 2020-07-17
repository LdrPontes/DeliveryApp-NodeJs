import { UseCase } from "../../utils/UseCase";
import { IOptionalSectionRepository } from "../../repositories/IOptionalSectionRepository";
import { OptionalSectionRepository } from "../../../data/repositories/OptionalSectionRepository";
import { OptionalSection } from "../../entities/OptionalSection";

export class UpdateOptionalSectionUseCase extends UseCase<UpdateOptionalSectionResponse, UpdateOptionalSectionParams>{

    repository: IOptionalSectionRepository = new OptionalSectionRepository()
    
    async buildUseCase(params: UpdateOptionalSectionParams): Promise<UpdateOptionalSectionResponse> {
        try {
            
            const result = await this.repository.update(params.id, params.name)

            return new UpdateOptionalSectionResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export class UpdateOptionalSectionResponse {
    section: OptionalSection

    constructor(section: OptionalSection) {
        this.section = section
    }
}

export class UpdateOptionalSectionParams {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
}