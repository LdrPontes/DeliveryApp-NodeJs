import { UseCase } from "../../utils/UseCase";

export class UpdateOptionalUseCase extends UseCase<UpdateOptionalResponse, UpdateOptionalParams>{
    buildUseCase(params: UpdateOptionalParams): Promise<UpdateOptionalResponse> {
        throw new Error("Method not implemented.");
    }

}

export class UpdateOptionalResponse {

}

export class UpdateOptionalParams {

}