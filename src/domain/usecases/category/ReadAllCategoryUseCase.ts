import { UseCase } from "../../utils/UseCase";
import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { CategoryRepository } from "../../../data/repositories/CategoryRepository";

export class ReadAllCategoryUseCase extends UseCase<ReadAllCategoryResponse, void>{

    repository: ICategoryRepository = new CategoryRepository()

    async buildUseCase(params: void): Promise<ReadAllCategoryResponse> {
        return new ReadAllCategoryResponse(await this.repository.readAll())
    }
}

export class ReadAllCategoryResponse {
    categories: Category[]

    constructor(categories: Category[]){
        this.categories = categories
    }
}