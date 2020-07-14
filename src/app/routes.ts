import { Router } from 'express'
import authEnterpriseController from './controllers/AuthEnterpriseController'
import enterpriseController from './controllers/EnterpriseController'
import productController from './controllers/ProductController'
import optionalController from './controllers/OptionalController'
import productSectionController from './controllers/ProductSectionController'
import optionalSectionController from './controllers/OptionalSectionController'

class Routes {
    public routes = Router()
    

    public constructor() {
        this.authEnterpriseRoutes()
        this.enterpriseRoutes()
        this.optionalRoutes()
        this.optionalSectionRoutes()
        this.productRoutes()
        this.productSectionRoutes()
    }

    private authEnterpriseRoutes(): void {
        this.routes.post('/enterprise/auth', (req, res) => {
            authEnterpriseController.auth(req, res)
        })

        this.routes.post('/enterprise/register', (req, res) => {
            authEnterpriseController.save(req,res)
        })
    }

    private enterpriseRoutes(): void {
        this.routes.post('/enterprise/save', (req, res) => {
            enterpriseController.save(req, res)
        })

        this.routes.get('/enterprise/read/:id', (req, res) => {
            enterpriseController.read(req, res)
        })

        this.routes.put('/enterprise/update', (req, res) => {
            enterpriseController.update(req, res)
        })
    }

    private productRoutes(){
        this.routes.post('/product/save', (req, res) => {
            productController.save(req, res)
        })

        this.routes.get('/product/read/:id', (req, res) => {
            productController.read(req, res)
        })

        this.routes.put('/product/update', (req, res) => {
            productController.update(req, res)
        })

        this.routes.delete('/product/delete/:id', (req, res) => {
            productController.delete(req, res)
        })
    }

    private optionalRoutes(){
        this.routes.post('/optional/save', (req, res) => {
            optionalController.save(req, res)
        })

        this.routes.get('/optional/read/:id', (req, res) => {
            optionalController.read(req, res)
        })

        this.routes.put('/optional/update', (req, res) => {
            optionalController.update(req, res)
        })

        this.routes.delete('/optional/delete/:id', (req, res) => {
            optionalController.delete(req, res)
        })
    }

    private productSectionRoutes(){
        this.routes.post('/section/product/save', (req, res) => {
            productSectionController.save(req, res)
        })

        this.routes.get('/section/product/read/:id', (req, res) => {
            productSectionController.read(req, res)
        })

        this.routes.put('/section/product/update', (req, res) => {
            productSectionController.update(req, res)
        })

        this.routes.delete('/section/product/delete/:id', (req, res) => {
            productSectionController.delete(req, res)
        })
    }

    private optionalSectionRoutes(){
        this.routes.post('/section/optional/save', (req, res) => {
            optionalSectionController.save(req, res)
        })

        this.routes.get('/section/optional/read/:id', (req, res) => {
            optionalSectionController.read(req, res)
        })

        this.routes.put('/section/optional/update', (req, res) => {
            optionalSectionController.update(req, res)
        })

        this.routes.delete('/section/optional/delete/:id', (req, res) => {
            optionalSectionController.delete(req, res)
        })
    }
}



export default new Routes().routes