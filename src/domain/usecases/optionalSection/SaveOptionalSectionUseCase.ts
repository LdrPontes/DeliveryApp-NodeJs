import { UseCase } from "../../utils/UseCase";

export class SaveOptionalSectionUseCase extends UseCase<SaveOptionalSectionResponse, SaveOptionalSectionParams>{
    buildUseCase(params: SaveOptionalSectionParams): Promise<SaveOptionalSectionResponse> {
        throw new Error("Method not implemented.");
    }

}

class SaveOptionalSectionResponse {

}

class SaveOptionalSectionParams {

}