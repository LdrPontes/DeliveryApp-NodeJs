import 'dotenv/config'
import Sequelize from 'sequelize'

export const dbConfig = new Sequelize.Sequelize(process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 3306,
  define: {
    timestamps: true,
    underscored: true,
  },
})