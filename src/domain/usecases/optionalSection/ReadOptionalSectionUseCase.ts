import { UseCase } from "../../utils/UseCase";

export class ReadOptionalSectionUseCase extends UseCase<ReadOptionalSectionResponse, ReadOptionalSectionParams>{
    buildUseCase(params: ReadOptionalSectionParams): Promise<ReadOptionalSectionResponse> {
        throw new Error("Method not implemented.");
    }

}

class ReadOptionalSectionResponse {

}

class ReadOptionalSectionParams {

}