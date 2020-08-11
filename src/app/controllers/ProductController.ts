import { Request, Response } from "express";
import CrudController from '../utils/CrudController'
import { SaveProductUseCase, SaveProductParams } from "../../domain/usecases/product/SaveProductUseCase";
import { ReadProductUseCase, ReadProductParams } from "../../domain/usecases/product/ReadProductUseCase";
import { UpdateProductUseCase, UpdateProductParams } from "../../domain/usecases/product/UpdateProductUseCase";
import { DeleteProductUseCase, DeleteProductParams } from "../../domain/usecases/product/DeleteProductUseCase";
import * as Yup from 'yup'
import AppError from "../../domain/utils/AppError";
import Errors from "../utils/Errors";
import textFormat from "../utils/TextFormat";
import { UploadImageUseCase, UploadImageParams } from "../../domain/usecases/image/UploadImageUseCase";
import { v4 as uuidv4 } from 'uuid';

class ProductController implements CrudController {

    saveProductUseCase = new SaveProductUseCase()
    readProductUseCase = new ReadProductUseCase()
    updateProductUseCase = new UpdateProductUseCase()
    deleteProductUseCase = new DeleteProductUseCase()
    
    uploadImageUseCase = new UploadImageUseCase()

    async save(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().required(),
                img: Yup.string(),
                img_type: Yup.string(),
                price: Yup.number().required(),
                enterprise_id: Yup.number().required().integer(),
                section_id: Yup.number().integer(),
                optional_sections: Yup.array()
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { title, description, img, img_type, price, enterprise_id, product_section_id, optional_sections } = req.body

            //Salva os dados no db
            let img_url = ''

            if (img != null && img_type != null && img != "" && img_type != "") {
                img_url = (await this.uploadImageUseCase.execute(new UploadImageParams(uuidv4(), img, img_type))).url
            }

            const product = (await this.saveProductUseCase.execute(new SaveProductParams(title, description, img_url, price, enterprise_id, product_section_id, optional_sections))).product

            return res.json(product)

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
    
            const product = (await this.readProductUseCase.execute(new ReadProductParams(Number(id)))).product
    
            return res.json(product)

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
                title: Yup.string(),
                description: Yup.string(),
                price: Yup.number(),
                img: Yup.string(),
                img_type: Yup.string(),
                id: Yup.number().required().integer(),
                section_id: Yup.number().integer(),
                optional_sections: Yup.array()
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }
            const { id, title, description, img, img_type, price, product_section_id, optional_sections } = req.body

            //Salva os dados no db
            let img_url = ''

            if (img != null && img_type != null && img != "" && img_type != "") {
                img_url = (await this.uploadImageUseCase.execute(new UploadImageParams(uuidv4(), img, img_type))).url
            }
        
            const product = (await this.updateProductUseCase.execute(new UpdateProductParams(id , title, description, img_url, price, product_section_id, optional_sections))).product

            return res.json(product)

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
    
            const result = (await this.deleteProductUseCase.execute(new DeleteProductParams(Number(id)))).success
    
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

const productController = new ProductController()
export default productController