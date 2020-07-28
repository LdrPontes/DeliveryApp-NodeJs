import { Request, Response } from "express";
import CrudController from '../utils/CrudController'
import * as Yup from 'yup'
import AppError from "../../domain/utils/AppError";
import Errors from '../utils/Errors';
import textFormat from "../utils/TextFormat";
import { SaveEnterpriseUseCase, SaveEnterpriseParams } from "../../domain/usecases/enterprise/SaveEnterpriseUseCase";
import { ReadEnterpriseUseCase, ReadEnterpriseParams } from "../../domain/usecases/enterprise/ReadEnterpriseUseCase";
import { UpdateEnterpriseUseCase, UpdateEnterpriseParams } from "../../domain/usecases/enterprise/UpdateEnterpriseUseCase";
import { DeleteEnterpriseUseCase, DeleteEnterpriseParams } from "../../domain/usecases/enterprise/DeleteEnterpriseUseCase";


class EnterpriseController implements CrudController {
    
    saveEnterpriseUseCase = new SaveEnterpriseUseCase()
    readEnterpriseUseCase = new ReadEnterpriseUseCase()
    updateEnterpriseUseCase = new UpdateEnterpriseUseCase()
    deleteEnterpriseUseCase = new DeleteEnterpriseUseCase()

    async save(req: Request, res: Response){
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                document_type: Yup.number().required(),
                document: Yup.string().required(),
                logo_url: Yup.string(),
                category_id: Yup.number().required().integer(),
                enterprise_id: Yup.number().required().integer(),
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { name, document_type, document, logo_url, enterprise_id, category_id } = req.body

            const optional = (await this.saveEnterpriseUseCase.execute(new SaveEnterpriseParams(name, document_type, document, logo_url, enterprise_id, category_id))).enterprise

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

    async read(req: Request, res: Response){
        try { 
            const schema = Yup.object().shape({
                id: Yup.number().integer().required()
            })
    
            if (!(await schema.isValid(req.params))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }
    
            const { id } = req.params
    
            const enterprise = (await this.readEnterpriseUseCase.execute(new ReadEnterpriseParams(Number(id)))).enterprise
    
            return res.json(enterprise)

        } catch (error) {
            if(Errors.isQueryError(error)) {
                console.log(error)
                return res.status(400).json(new AppError(400, textFormat.camelToUnderscore(error.name), error.message))
            } else {
                return res.status(500).json(new AppError(500, textFormat.camelToUnderscore(error.name), error.message))
            }
        }
    }

    async update(req: Request, res: Response){
        try {
            const schema = Yup.object().shape({
                name: Yup.string(),
                logo_url: Yup.string(),
                id: Yup.number().required().integer(),
                category_id: Yup.number().integer(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name, logo_url, category_id } = req.body

            const enterprise = (await this.updateEnterpriseUseCase.execute(new UpdateEnterpriseParams(id , name, logo_url, category_id))).enterprise

            return res.json(enterprise)

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
    
            const result = (await this.deleteEnterpriseUseCase.execute(new DeleteEnterpriseParams(Number(id)))).success
    
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

const enterpriseController = new EnterpriseController()
export default enterpriseController