import { UseCase } from "../../utils/UseCase";
import { OptionalSection } from "../../entities/OptionalSection";
import { IOptionalSectionRepository } from "../../repositories/IOptionalSectionRepository";
import { OptionalSectionRepository } from "../../../data/repositories/OptionalSectionRepository";

export class ReadOptionalSectionUseCase extends UseCase<ReadOptionalSectionResponse, ReadOptionalSectionParams>{
    
    repository: IOptionalSectionRepository = new OptionalSectionRepository()


    async buildUseCase(params: ReadOptionalSectionParams): Promise<ReadOptionalSectionResponse> {
        try {

            const result = await this.repository.read(params.id, params.search)

            return new ReadOptionalSectionResponse(result)

        } catch (error) {
            console.log(error)

            throw error
        }
    }

}

export class ReadOptionalSectionResponse {
    sections: OptionalSection[]

    constructor(sections: OptionalSection[]) {
        this.sections = sections
    }
}

export class ReadOptionalSectionParams {
    id: number
    search: string

    constructor(id: number, search: string) {
        this.id = id
        this.search = search
    }
}