import { Request, Response } from "express";
import CrudController from '../utils/CrudController'
import { DeleteOptionalUseCase } from "../../domain/usecases/optional/DeleteOptionalUseCase";
import { ReadOptionalUseCase, ReadOptionalParams } from "../../domain/usecases/optional/ReadOptionalUseCase";
import { SaveOptionalUseCase, SaveOptionalParams } from "../../domain/usecases/optional/SaveOptionalUseCase";
import { UpdateOptionalUseCase } from "../../domain/usecases/optional/UpdateOptionalUseCase";
import * as Yup from 'yup'
import AppError from "../../domain/utils/AppError";
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
            console.log(error)
            return res.status(400).json(new AppError(400, textFormat.camelToUnderscore(error.name), error.message))
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
            console.log(error)
            return res.status(400).json(new AppError(400, textFormat.camelToUnderscore(error.name), error.message))
        }
      

    }

    async update(req: Request, res: Response) {
        const schema = Yup.object().shape({
            id: Yup.number().integer().required(),
            name: Yup.string(),
            price: Yup.number(),
            section_id: Yup.number().integer(),

        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
        }

        return res.json({ message: "Foi" })

    }

    async delete(req: Request, res: Response) {
        //TODO
    }
}

const optionalController = new OptionalController()
export default optionalController