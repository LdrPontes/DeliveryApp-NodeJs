import { UseCase } from "../../utils/UseCase";

export class UpdateProductSectionUseCase extends UseCase<UpdateProductSectionResponse, UpdateProductSectionParams>{
    buildUseCase(params: UpdateProductSectionParams): Promise<UpdateProductSectionResponse> {
        throw new Error("Method not implemented.");
    }

}

export class UpdateProductSectionResponse {

}

export class UpdateProductSectionParams {

}