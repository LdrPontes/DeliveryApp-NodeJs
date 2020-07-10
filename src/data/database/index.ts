import Sequelize from 'sequelize'
import { dbConfig } from '../config/database'


const models = []


class Database {
    public connection: Sequelize.Sequelize;

    constructor() {
        this.init();
    }

    init(): void {
        this.connection = dbConfig;

        models.map(model => model.init(this.connection))
    }
}

const database: Database = new Database();

export default database;