import { UseCase } from "../../utils/UseCase";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ProductRepository } from "../../../data/repositories/ProductRepository";
import { Product } from "../../entities/Product";

export class UpdateProductUseCase extends UseCase<UpdateProductResponse, UpdateProductParams>{

    repository: IProductRepository = new ProductRepository()

    async buildUseCase(params: UpdateProductParams): Promise<UpdateProductResponse> {
        try {

            const result = await this.repository.update(params.id, params.title, params.description, params.img_url, params.price, params.section_id)

            return new UpdateProductResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export class UpdateProductResponse {
    product: Product

    constructor(product: Product) {
        this.product = product
    }
}

export class UpdateProductParams {
    id: number
    title: string
    description: string
    img_url: string
    price: number
    section_id: number

    constructor(id: number, title: string, description: string, img_url: string, price: number, section_id: number) {
        this.id = id
        this.title = title
        this.description = description
        this.img_url = img_url
        this.price = price
        this.section_id = section_id
    }
}