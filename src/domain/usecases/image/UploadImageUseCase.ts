import { UseCase } from "../../utils/UseCase";
import { IImageRepository } from "../../repositories/IImageRepository";
import { ImageRespository } from "../../../data/repositories/ImageRepository";

export class UploadImageUseCase extends UseCase<UploadImageResponse, UploadImageParams>{
    
    repository: IImageRepository = new ImageRespository()

    async buildUseCase(params: UploadImageParams): Promise<UploadImageResponse> {

        const response = await this.repository.save(params.name, params.base64, params.img_type)

        return new UploadImageResponse(response)
    }

}

export class UploadImageResponse {
    url: string

    constructor(url: string) {
        this.url = url
    }
}

export class UploadImageParams {
    name: string
    base64: string
    img_type: string

    constructor(name: string, base64: string, img_type: string) {
        this.name = name
        this.base64 = base64
        this.img_type = img_type
    }
}