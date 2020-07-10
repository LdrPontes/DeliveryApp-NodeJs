import express from 'express'
import routes from './routes'
import dotenv from 'dotenv'
import '../data/database'
import { dbConfig } from '../data/config/database'


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
        try {
            await dbConfig.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
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