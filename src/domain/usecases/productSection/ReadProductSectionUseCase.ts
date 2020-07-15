import { UseCase } from "../../utils/UseCase";

export class ReadProductSectionUseCase extends UseCase<ReadProductSectionResponse, ReadProductSectionParams>{
    buildUseCase(params: ReadProductSectionParams): Promise<ReadProductSectionResponse> {
        throw new Error("Method not implemented.");
    }

}

class ReadProductSectionResponse {

}

class ReadProductSectionParams {

}