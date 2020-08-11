import { UseCase } from "../../utils/UseCase";
import { Product } from "../../entities/Product";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ProductRepository } from "../../../data/repositories/ProductRepository";

export class SaveProductUseCase extends UseCase<SaveProductResponse, SaveProductParams>{

    repository: IProductRepository = new ProductRepository()

    async buildUseCase(params: SaveProductParams): Promise<SaveProductResponse> {
        try {

            const result = await this.repository.save(params.title, params.description, params.img_url, params.price, params.enterprise_id, params.section_id, params.optional_sections)

            return new SaveProductResponse(result)

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export class SaveProductResponse {
    product: Product

    constructor(product: Product) {
        this.product = product
    }
}

export class SaveProductParams {
    title: string
    description: string
    img_url: string
    price: number
    enterprise_id: number
    section_id: number
    optional_sections: number[]

    constructor(title: string, description: string, img_url: string, price: number, enterprise_id: number, section_id: number, optional_sections: number[]) {
        this.title = title
        this.description = description
        this.img_url = img_url
        this.price = price
        this.enterprise_id = enterprise_id
        this.section_id = section_id
        this.optional_sections = optional_sections
    }
}