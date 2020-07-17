import { UseCase } from "../../utils/UseCase";

export class DeleteOptionalUseCase extends UseCase<DeleteOptionalResponse, DeleteOptionalParams>{
    buildUseCase(params: DeleteOptionalParams): Promise<DeleteOptionalResponse> {
        throw new Error("Method not implemented.");
    }

}

export class DeleteOptionalResponse {

}

export class DeleteOptionalParams {

}