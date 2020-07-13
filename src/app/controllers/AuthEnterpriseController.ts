import { Request, Response } from "express";
import { SignInEnterpriseUseCase, SignInEnterpriseParams } from "../../domain/usecases/SignInEnterpriseUseCase";
import { SignUpEnterpriseUseCase, SignUpEnterpriseParams } from "../../domain/usecases/SignUpEnterpriseUseCase";


class AuthEnterpriseController {
    signInEnterpriseUseCase = new SignInEnterpriseUseCase()
    signUpEnterpriseUseCase = new SignUpEnterpriseUseCase()

    public async registerEnterprise(req: Request, res: Response) {
        try {
            const { name, telephone, email, password } = req.body

        
            const enterprise = await this.signUpEnterpriseUseCase.execute(new SignUpEnterpriseParams(name, telephone, email, password))

            res.json(enterprise)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

    public async authenticateEnterprise(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const enterprise = await this.signInEnterpriseUseCase.execute(new SignInEnterpriseParams(email, password))

            res.json(enterprise)
        } catch (error) {
            res.status(400).json(error)
        }

    }


}

const authEnterpriseController = new AuthEnterpriseController()
export default authEnterpriseController