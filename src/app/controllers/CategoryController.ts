import { ReadAllCategoryUseCase } from "../../domain/usecases/category/ReadAllCategoryUseCase"
import Errors from "../utils/Errors"
import AppError from "../../domain/utils/AppError"
import { Request, Response } from "express"
import textFormat from "../utils/TextFormat"


class CategoryController {

    readAllCategoryUseCase = new ReadAllCategoryUseCase()

    async readAll(req: Request, res: Response) {
        try {
            const result = await this.readAllCategoryUseCase.execute()
            
            res.json(result)
        } catch (error) {
            if (Errors.isQueryError(error)) {
                return res.status(400).json(new AppError(400, textFormat.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new AppError(500, textFormat.camelToUnderscore(error.name), error.message))
            }
        }
    }
}

const categoryController = new CategoryController()
export default categoryController