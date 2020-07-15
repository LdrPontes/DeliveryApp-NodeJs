import { UseCase } from "../../utils/UseCase";

export class DeleteProductSectionUseCase extends UseCase<DeleteProductSectionResponse, DeleteProductSectionParams>{
    buildUseCase(params: DeleteProductSectionParams): Promise<DeleteProductSectionResponse> {
        throw new Error("Method not implemented.");
    }

}

class DeleteProductSectionResponse {

}

class DeleteProductSectionParams {

}