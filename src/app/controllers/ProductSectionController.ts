import { Request, Response } from "express";
import CrudController from '../utils/CrudController'
import { SaveProductSectionUseCase, SaveProductSectionParams } from "../../domain/usecases/productSection/SaveProductSectionUseCase";
import { ReadProductSectionUseCase, ReadProductSectionParams } from "../../domain/usecases/productSection/ReadProductSectionUseCase";
import { UpdateProductSectionUseCase, UpdateProductSectionParams } from "../../domain/usecases/productSection/UpdateProductSectionUseCase";
import { DeleteProductSectionUseCase, DeleteProductSectionParams } from "../../domain/usecases/productSection/DeleteProductSectionUseCase";
import * as Yup from 'yup'
import AppError from "../../domain/utils/AppError";
import Errors from "../utils/Errors";
import textFormat from "../utils/TextFormat";
import { isNullOrUndefined } from "util";

class ProductSectionController implements CrudController {

    saveProductSectionUseCase = new SaveProductSectionUseCase()
    readProductSectionUseCase = new ReadProductSectionUseCase()
    updateProductSectionUseCase = new UpdateProductSectionUseCase()
    deleteProductSectionUseCase = new DeleteProductSectionUseCase()

    async save(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                enterprise_id: Yup.number().required().integer()
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { name, enterprise_id } = req.body

            const section = (await this.saveProductSectionUseCase.execute(new SaveProductSectionParams(name, enterprise_id))).section

            return res.json(section)

        } catch (error) {
            if(Errors.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new AppError(400, textFormat.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new AppError(500, textFormat.camelToUnderscore(error.name), error.message))
            }
        }
    }

    async read(req: Request, res: Response) {
        try { 
            const schema = Yup.object().shape({
                id: Yup.number().integer().required()
            })
    
            if (!(await schema.isValid(req.params))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }
    
            const { id } = req.params
            
            let search = req.query.search
            
            if(isNullOrUndefined(search)) {
                search = ''
            } else {
                search = search.toString()
            }
            

            const sections = (await this.readProductSectionUseCase.execute(new ReadProductSectionParams(Number(id), search))).sections
    
            return res.json(sections)

        } catch (error) {
            if(Errors.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new AppError(400, textFormat.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new AppError(500, textFormat.camelToUnderscore(error.name), error.message))
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string(),
                id: Yup.number().required().integer(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name} = req.body

            const section = (await this.updateProductSectionUseCase.execute(new UpdateProductSectionParams(id , name))).section

            return res.json(section)

        } catch (error) {
            if(Errors.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new AppError(400, textFormat.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new AppError(500, textFormat.camelToUnderscore(error.name), error.message))
            }
        }
    }

    async delete(req: Request, res: Response) {
        try { 
            const schema = Yup.object().shape({
                id: Yup.number().integer().required()
            })
    
            if (!(await schema.isValid(req.params))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }
    
            const { id } = req.params
    
            const result = (await this.deleteProductSectionUseCase.execute(new DeleteProductSectionParams(Number(id)))).success
    
            return res.status(result ? 200 : 400).json({
                status: result ? 200 : 400,
                name: result ? 'ENTITY_DELETED' : 'ENTITY_NOT_FOUND',
                success: result
            })

        } catch (error) {
            if(Errors.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new AppError(400, textFormat.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new AppError(500, textFormat.camelToUnderscore(error.name), error.message))
            }
        }
    }
}

const productSectionController = new ProductSectionController()
export default productSectionController