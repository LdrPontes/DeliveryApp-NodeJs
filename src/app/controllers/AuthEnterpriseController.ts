import { Request, Response } from "express";
import { EnterpriseUser } from "../../domain/entities/EnterpriseUser";

class AuthEnterpriseController {

    public async registerEnterprise(req: Request, res: Response) {
        //TODO
    }

    public async authenticateEnterprise(req: Request, res: Response) {
        //TODO
    }


}

const authEnterpriseController = new AuthEnterpriseController()
export default authEnterpriseController