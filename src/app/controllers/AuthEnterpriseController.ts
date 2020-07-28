import { Request, Response } from "express";
import { SignInEnterpriseUseCase, SignInEnterpriseParams } from "../../domain/usecases/auth/SignInEnterpriseUseCase";
import { SignUpEnterpriseUseCase, SignUpEnterpriseParams } from "../../domain/usecases/auth/SignUpEnterpriseUseCase";
import AppError from "../../domain/utils/AppError";
import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import textFormat from '../utils/TextFormat'
import Strings from "../utils/Strings";

class AuthEnterpriseController {
    signInEnterpriseUseCase = new SignInEnterpriseUseCase()
    signUpEnterpriseUseCase = new SignUpEnterpriseUseCase()

    public async save(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                telephone: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { name, telephone, email, password } = req.body

            const enterprise = (await this.signUpEnterpriseUseCase.execute(new SignUpEnterpriseParams(name, telephone, email, password))).enterpriseUser

            res.json({
                enterprise_user: {
                    id: enterprise.id,
                    name: enterprise.name,
                    telephone: enterprise.telephone,
                    email: enterprise.email,
                    created_at: enterprise.created_at,
                    updated_at: enterprise.updated_at,
                },
                token: jwt.sign({ id: enterprise.id }, Strings.jwt_key, {
                    expiresIn: '1d'

                })
            })
        } catch (error) {
            console.log(error)
            if (error.message.includes('ER_DUP_ENTRY'))
                res.status(400).json(new AppError(400, 'ER_DUP_ENTRY', error.message))
            else
                res.status(400).json(new AppError(400, textFormat.camelToUnderscore(error.name), error.message))
        }
    }

    public async auth(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required(),
            })

            if (!(await schema.isValid(req.body))) {
                console.log(schema)
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const { email, password } = req.body

            const enterprise = (await this.signInEnterpriseUseCase.execute(new SignInEnterpriseParams(email, password))).enterpriseUser

            res.json({
                enterprise_user: {
                    id: enterprise.id,
                    name: enterprise.name,
                    telephone: enterprise.telephone,
                    email: enterprise.email,
                    created_at: enterprise.created_at,
                    updated_at: enterprise.updated_at,
                },
                token: jwt.sign({ id: enterprise.id }, Strings.jwt_key, {
                    expiresIn: '1d'

                })
            })
        } catch (error) {
            res.status(401).json(new AppError(401, textFormat.camelToUnderscore(error.name), error.message))
        }

    }


}

const authEnterpriseController = new AuthEnterpriseController()
export default authEnterpriseController