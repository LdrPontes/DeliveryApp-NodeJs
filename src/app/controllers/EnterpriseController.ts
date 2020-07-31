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
import { UploadImageUseCase, UploadImageParams } from "../../domain/usecases/image/UploadImageUseCase";
import { v4 as uuidv4 } from 'uuid';
import { cpf, cnpj } from 'cpf-cnpj-validator'

class EnterpriseController implements CrudController {

    saveEnterpriseUseCase = new SaveEnterpriseUseCase()
    readEnterpriseUseCase = new ReadEnterpriseUseCase()
    updateEnterpriseUseCase = new UpdateEnterpriseUseCase()
    deleteEnterpriseUseCase = new DeleteEnterpriseUseCase()

    uploadImageUseCase = new UploadImageUseCase()

    async save(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                document_type: Yup.number().required(),
                document: Yup.string().required(),
                img: Yup.string(),
                img_type: Yup.string(),
                address: Yup.string().required(),
                category_id: Yup.number().required().integer(),
                enterprise_id: Yup.number().required().integer(),
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }


            const { name, document_type, document, address, img, img_type, enterprise_id, category_id } = req.body

            //Valida o documento
            if (document_type == 0) { //CPF
                if (!cpf.isValid(document)) {
                    return res.status(400).json(new AppError(400, textFormat.camelToUnderscore('INVALID_DOCUMENT'), 'This document (CPF) is not valid'))
                }
            } else {    //CNPJ
                if (!cnpj.isValid(document)) {
                    return res.status(400).json(new AppError(400, textFormat.camelToUnderscore('INVALID_DOCUMENT'), 'This document (CNPJ) is not valid'))
                }
            }


            //Salva os dados no db
            let logo_url = ''

            if (img != null && img_type != null && img != "" && img_type != "") {
                logo_url = (await this.uploadImageUseCase.execute(new UploadImageParams(uuidv4(), img, img_type))).url
            }


            const optional = (await this.saveEnterpriseUseCase.execute(new SaveEnterpriseParams(name, document_type, document, address, logo_url, enterprise_id, category_id))).enterprise

            return res.json(optional)

        } catch (error) {
            if (Errors.isQueryError(error)) {
                if (error.message.includes('ER_DUP_ENTRY'))
                    return res.status(400).json(new AppError(400, 'ER_DUP_ENTRY', error.message))
                else
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

            const enterprise = (await this.readEnterpriseUseCase.execute(new ReadEnterpriseParams(Number(id)))).enterprise

            return res.json(enterprise)

        } catch (error) {
            if (Errors.isQueryError(error)) {
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
                logo_url: Yup.string(),
                address: Yup.string(),
                id: Yup.number().required().integer(),
                category_id: Yup.number().integer(),

            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name, address, logo_url, category_id } = req.body

            const enterprise = (await this.updateEnterpriseUseCase.execute(new UpdateEnterpriseParams(id, name, address, logo_url, category_id))).enterprise

            return res.json(enterprise)

        } catch (error) {
            if (Errors.isQueryError(error)) {
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
            if (Errors.isQueryError(error)) {
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