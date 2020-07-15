import { UseCase } from "../../utils/UseCase";

export class SaveOptionalUseCase extends UseCase<SaveOptionalResponse, SaveOptionalParams>{
    buildUseCase(params: SaveOptionalParams): Promise<SaveOptionalResponse> {
        throw new Error("Method not implemented.");
    }

}

class SaveOptionalResponse {

}

class SaveOptionalParams {

}