import CrudController from '../utils/CrudController'
import { Request, Response } from 'express'
import AppError from '../../domain/utils/AppError'
import textFormat from '../utils/TextFormat'
import * as Yup from 'yup'
import Errors from '../utils/Errors'
import { UpdateEnterpriseUserUseCase, UpdateEnterpriseUserParams } from '../../domain/usecases/enterpriseUser/UpdateEnterpriseUserUseCase'

class EnterpriseUserController implements CrudController {
    updateEnterpriseUserUseCase = new UpdateEnterpriseUserUseCase()
    async save(req: Request, res: Response) {
        //TODO Not Implemented
    }

    async read(req: Request, res: Response) {
        //TODO Not Implemented
    }

    async update(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                id: Yup.number().integer().required(),
                name: Yup.string().min(3),
                telephone: Yup.string().min(13),
                email: Yup.string().email(),
                password: Yup.string().min(6),
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { id, name, telephone, email, password } = req.body

            const enterprise = (await this.updateEnterpriseUserUseCase.execute(new UpdateEnterpriseUserParams(id, name, telephone, email, password))).enterpriseUser
            res.json({
                id: enterprise.id,
                name: enterprise.name,
                telephone: enterprise.telephone,
                email: enterprise.email,
                enterprise: enterprise.enterprise,
                created_at: enterprise.created_at,
                updated_at: enterprise.updated_at,
            })

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

    async delete(req: Request, res: Response) {
        //TODO Not Implemented
    }
}

const enterpriseUserController = new EnterpriseUserController()
export default enterpriseUserController