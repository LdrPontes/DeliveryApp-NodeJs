import { UseCase } from "../../utils/UseCase";

export class UpdateProductUseCase extends UseCase<UpdateProductResponse, UpdateProductParams>{
    buildUseCase(params: UpdateProductParams): Promise<UpdateProductResponse> {
        throw new Error("Method not implemented.");
    }

}

class UpdateProductResponse {

}

class UpdateProductParams {

}