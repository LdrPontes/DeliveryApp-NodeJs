require('dotenv')


module.exports = {
    "type": process.env.DB_TYPE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "synchronize": true,
    "logging": false,
    "columnHint":'snakeCase',
    "entities": [
        "src/domain/entities/*.ts"
    ],
    "migrations": [
        "src/data/database/migrations/*.ts"
    ],
    "subscribers": [
        "src/data/database/subscribers/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/domain/entities",
        "migrationsDir": "src/data/database/migrations",
        "subscribersDir": "src/data/database/subscribers"
    }
}