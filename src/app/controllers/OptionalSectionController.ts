import { Request, Response } from "express";
import CrudController from '../utils/CrudController'
import { SaveOptionalSectionUseCase, SaveOptionalSectionParams } from "../../domain/usecases/optionalSection/SaveOptionalSectionUseCase";
import { ReadOptionalSectionUseCase, ReadOptionalSectionParams } from "../../domain/usecases/optionalSection/ReadOptionalSectionUseCase";
import { UpdateOptionalSectionUseCase, UpdateOptionalSectionParams } from "../../domain/usecases/optionalSection/UpdateOptionalSectionUseCase";
import { DeleteOptionalSectionUseCase, DeleteOptionalSectionParams } from "../../domain/usecases/optionalSection/DeleteOptionalSectionUseCase";
import AppError from "../../domain/utils/AppError";
import Errors from "../utils/Errors";
import textFormat from "../utils/TextFormat";
import * as Yup from 'yup'
import { isNullOrUndefined } from "util";


class OptionalSectionController implements CrudController {
    saveOptionalUseCase = new SaveOptionalSectionUseCase()
    readOptionalUseCase = new ReadOptionalSectionUseCase()
    updateOptionalUseCase = new UpdateOptionalSectionUseCase()
    deleteOptionalUseCase = new DeleteOptionalSectionUseCase()

    async save(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                min: Yup.number().required(),
                max: Yup.number().required(),
                enterprise_id: Yup.number().required().integer()
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { name, enterprise_id, min, max } = req.body

            const section = (await this.saveOptionalUseCase.execute(new SaveOptionalSectionParams(name, enterprise_id, min, max))).section

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
            

            const sections = (await this.readOptionalUseCase.execute(new ReadOptionalSectionParams(Number(id), search))).sections
    
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
                min: Yup.number(),
                max: Yup.number(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name, min, max } = req.body

            const section = (await this.updateOptionalUseCase.execute(new UpdateOptionalSectionParams(id , name, min, max))).section

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
    
            const result = (await this.deleteOptionalUseCase.execute(new DeleteOptionalSectionParams(Number(id)))).success
    
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

const optionalSectionController = new OptionalSectionController()
export default optionalSectionController