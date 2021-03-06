import createConnection from '../data/database/database'
import express from 'express'
import 'express-async-errors'
import routes from './routes'
import dotenv from 'dotenv'
import Youch from 'youch'
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry'
import 'reflect-metadata'
import AppError from '../domain/utils/AppError'
import cors from 'cors'
import bodyParser from 'body-parser'

class App {
    public express = express.application

    public constructor() {
        this.express = express()

        this.configs()
        this.middlewares()
        this.database()
        this.routes()
        this.exceptionHandler()
    }

    private middlewares(): void {
        this.express.use(bodyParser.json({
            limit: '50mb'
        }))
        this.express.use(bodyParser.urlencoded({
            limit: '50mb',
            parameterLimit: 50000,
            extended: true
        }))
        this.express.use(Sentry.Handlers.requestHandler())
        this.express.use(express.json())
        this.express.use(cors());
      
    }

    private async database() {
        createConnection().then(async connection => {
            console.log("TypeORM connection success")
        }).catch(error => {
            console.log("Type " + error.type)
            throw new AppError(500, "TypeORM connection error: ", error)

        })
    }


    private routes(): void {
        this.express.use(routes)
        this.express.use(Sentry.Handlers.errorHandler())
    }

    private configs(): void {
        Sentry.init(sentryConfig)
        const path = process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev'
        console.log(path)
        dotenv.config({
            path: path
        })
    }

    private exceptionHandler(): void {
        this.express.use(async (err, req, res, next) => {
            console.log(err)
            const errors = await new Youch(err, req)

            return res.status(500).json(errors)
        })
    }
}

export default new App().express