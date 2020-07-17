import { Request, Response } from "express";
import CrudController from '../utils/CrudController'
import { DeleteOptionalUseCase, DeleteOptionalParams } from "../../domain/usecases/optional/DeleteOptionalUseCase";
import { ReadOptionalUseCase, ReadOptionalParams } from "../../domain/usecases/optional/ReadOptionalUseCase";
import { SaveOptionalUseCase, SaveOptionalParams } from "../../domain/usecases/optional/SaveOptionalUseCase";
import { UpdateOptionalUseCase, UpdateOptionalParams } from "../../domain/usecases/optional/UpdateOptionalUseCase";
import * as Yup from 'yup'
import AppError from "../../domain/utils/AppError";
import Errors from '../utils/Errors';
import textFormat from "../utils/TextFormat";

class OptionalController implements CrudController {

    saveOptionalUseCase = new SaveOptionalUseCase()
    readOptionalUseCase = new ReadOptionalUseCase()
    updateOptionalUseCase = new UpdateOptionalUseCase()
    deleteOptionalUseCase = new DeleteOptionalUseCase()

    async save(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                price: Yup.number().required(),
                enterprise_id: Yup.number().required().integer(),
                section_id: Yup.number().integer(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { name, price, enterprise_id, section_id } = req.body

            const optional = (await this.saveOptionalUseCase.execute(new SaveOptionalParams(name, price, enterprise_id, section_id))).optional

            return res.json(optional)

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
    
            const optional = (await this.readOptionalUseCase.execute(new ReadOptionalParams(Number(id)))).optional
    
            return res.json(optional)

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
                price: Yup.number(),
                id: Yup.number().required().integer(),
                section_id: Yup.number().integer(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name, price, section_id } = req.body

            const optional = (await this.updateOptionalUseCase.execute(new UpdateOptionalParams(id , name, price, section_id))).optional

            return res.json(optional)

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
    
            const result = (await this.deleteOptionalUseCase.execute(new DeleteOptionalParams(Number(id)))).success
    
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

const optionalController = new OptionalController()
export default optionalController