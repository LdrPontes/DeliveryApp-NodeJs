import { Request, Response } from "express";
import CrudController from '../utils/CrudController'


class EnterpriseController implements CrudController {
    
    async save(req: Request, res: Response){
        //TODO
    }

    async read(req: Request, res: Response){
        //TODO
    }

    async update(req: Request, res: Response){
        //TODO
    }

    async delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}

const enterpriseController = new EnterpriseController()
export default enterpriseController