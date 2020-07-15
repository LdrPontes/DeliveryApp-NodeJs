import { UseCase } from "../../utils/UseCase";

export class ReadProductUseCase extends UseCase<ReadProductResponse, ReadProductParams>{
    buildUseCase(params: ReadProductParams): Promise<ReadProductResponse> {
        throw new Error("Method not implemented.");
    }

}

class ReadProductResponse {

}

class ReadProductParams {

}