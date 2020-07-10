import { Router } from 'express'

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
        this.routes.post('/enterprise/auth', (req, res) => {
            console.log(req.baseUrl)
            res.json({ message: " Oi " })
        })
    }
}



export default new Routes().routes