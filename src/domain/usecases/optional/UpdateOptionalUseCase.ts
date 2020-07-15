import { UseCase } from "../../utils/UseCase";

export class UpdateOptionalUseCase extends UseCase<UpdateOptionalResponse, UpdateOptionalParams>{
    buildUseCase(params: UpdateOptionalParams): Promise<UpdateOptionalResponse> {
        throw new Error("Method not implemented.");
    }

}

class UpdateOptionalResponse {

}

class UpdateOptionalParams {

}