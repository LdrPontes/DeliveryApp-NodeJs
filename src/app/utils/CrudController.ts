import { Request, Response } from "express"

export default interface BaseController {
    save(req: Request, res: Response)

    read(req: Request, res: Response)

    update(req: Request, res: Response) 

    delete(req: Request, res: Response)
}