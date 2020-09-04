import { Request, Response } from "express"
import * as Yup from 'yup'
import AppError from "../../domain/utils/AppError"
import textFormat from "../utils/TextFormat"
import Errors from "../utils/Errors"
import { ReadEnterpriseByCodeUseCase, ReadEnterpriseByCodeParams } from "../../domain/usecases/order/ReadEnterpriseByCodeUseCase"

class OrderController {
    readEnterpriseByCodeUseCase = new ReadEnterpriseByCodeUseCase()

    async readEnterpriseByCode(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                code: Yup.string().required(),
            })

            if (!(await schema.isValid(req.params))) {
                return res.status(400).json(new AppError(400, 'INVALID_PARAMETERS', 'Invalid params for request'))
            }

            const {code} = req.params
            
            const result = await (await this.readEnterpriseByCodeUseCase.execute(new ReadEnterpriseByCodeParams(code))).enterprise

            return res.json(result)

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


const orderController = new OrderController()
export default orderController