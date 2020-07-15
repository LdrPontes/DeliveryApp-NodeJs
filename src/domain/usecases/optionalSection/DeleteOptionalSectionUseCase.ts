import { UseCase } from "../../utils/UseCase";

export class DeleteOptionalSectionUseCase extends UseCase<DeleteOptionalSectionResponse, DeleteOptionalSectionParams>{
    buildUseCase(params: DeleteOptionalSectionParams): Promise<DeleteOptionalSectionResponse> {
        throw new Error("Method not implemented.");
    }

}

class DeleteOptionalSectionResponse {

}

class DeleteOptionalSectionParams {

}