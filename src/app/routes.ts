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
            authEnterpriseController.authenticateEnterprise(req, res)
        })
    }

    private registerEnterpriseRoute(): void {
        this.routes.post('/enterprise/register', (req, res) => {
            authEnterpriseController.registerEnterprise(req,res)
        })
    }
}



export default new Routes().routes