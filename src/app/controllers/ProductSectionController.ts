import { Request, Response } from "express";
import CrudController from '../utils/CrudController'


class ProductSectionController implements CrudController {
    async save(req: Request, res: Response) {
        //TODO
    }

    async read(req: Request, res: Response) {
        //TODO
    }

    async update(req: Request, res: Response) {
        //TODO
    }

    async delete(req: Request, res: Response) {
        //TODO
    }
}

const productSectionController = new ProductSectionController()
export default productSectionController