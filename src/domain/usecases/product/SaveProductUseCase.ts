import { UseCase } from "../../utils/UseCase";

export class SaveProductUseCase extends UseCase<SaveProductResponse, SaveProductParams>{
    buildUseCase(params: SaveProductParams): Promise<SaveProductResponse> {
        throw new Error("Method not implemented.");
    }

}

class SaveProductResponse {

}

class SaveProductParams {

}