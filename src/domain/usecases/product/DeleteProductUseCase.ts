import { UseCase } from "../../utils/UseCase";

export class DeleteProductUseCase extends UseCase<DeleteProductResponse, DeleteProductParams>{
    buildUseCase(params: DeleteProductParams): Promise<DeleteProductResponse> {
        throw new Error("Method not implemented.");
    }

}

export class DeleteProductResponse {

}

export class DeleteProductParams {

}