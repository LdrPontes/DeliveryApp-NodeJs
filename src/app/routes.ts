import { Router } from 'express'
import authEnterpriseController from './controllers/AuthEnterpriseController'

class Routes {
    public routes = Router()
    

    public constructor() {
        this.authEnterpriseRoute()
        this.registerEnterpriseRoute()
    }

    private authEnterpriseRoute(): void {
        this.routes.post('/enterprise/auth', (req, res) => {
            console.log(req.baseUrl)
            res.json({ message: " Oi " })
        })
    }

    private registerEnterpriseRoute(): void {
        this.routes.post('/enterprise/register', (req, res) => {
            console.log(req.baseUrl)
            authEnterpriseController.registerEnterprise(req,res)
            res.json({ message: " Deu boa " })
        })
    }
}



export default new Routes().routes