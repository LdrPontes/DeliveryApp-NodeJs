import { UseCase } from "../../utils/UseCase";

export class SaveProductSectionUseCase extends UseCase<SaveProductSectionResponse, SaveProductSectionParams>{
    buildUseCase(params: SaveProductSectionParams): Promise<SaveProductSectionResponse> {
        throw new Error("Method not implemented.");
    }

}

class SaveProductSectionResponse {

}

class SaveProductSectionParams {

}