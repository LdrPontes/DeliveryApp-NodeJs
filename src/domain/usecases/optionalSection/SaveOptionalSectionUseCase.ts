import { UseCase } from "../../utils/UseCase";

export class SaveOptionalSectionUseCase extends UseCase<SaveOptionalSectionResponse, SaveOptionalSectionParams>{
    buildUseCase(params: SaveOptionalSectionParams): Promise<SaveOptionalSectionResponse> {
        throw new Error("Method not implemented.");
    }

}

export class SaveOptionalSectionResponse {

}

export class SaveOptionalSectionParams {

}