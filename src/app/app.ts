import createConnection from '../data/database/database'
import express from 'express'
import routes from './routes'
import dotenv from 'dotenv'
import 'reflect-metadata'

class App {
    public express = express.application

    public constructor() {
        this.express = express()

        this.configs()
        this.middlewares()
        this.database()
        this.routes()
    }

    private middlewares(): void {
        this.express.use(express.json())
    }

    private async database() {
        createConnection().then(async connection => {
            console.log("TypeORM connection success")
        }).catch(error => console.log("TypeORM connection error: ", error))
    }


    private routes(): void {
        this.express.use(routes)
    }

    private configs(): void {
        dotenv.config({
            path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env"
        })
    }
}

export default new App().express