import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { Category } from "../../domain/entities/Category";
import { getRepository } from "typeorm";

export class CategoryRepository implements ICategoryRepository {
    
    async readAll(): Promise<Category[]> {
        try {

            const repository = getRepository(Category);

            return await repository.find()

        } catch (error) {
            console.log(error)
            throw error
        }
    }

}