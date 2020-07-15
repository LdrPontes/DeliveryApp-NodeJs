import { UseCase } from "../../utils/UseCase";

export class ReadOptionalUseCase extends UseCase<ReadOptionalResponse, ReadOptionalParams>{
    buildUseCase(params: ReadOptionalParams): Promise<ReadOptionalResponse> {
        throw new Error("Method not implemented.");
    }

}

class ReadOptionalResponse {

}

class ReadOptionalParams {

}