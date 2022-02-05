import path from 'path'
import { Sequelize } from 'sequelize'

const database: Sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, './database.sqlite'),
  logging: false
})

export default database
