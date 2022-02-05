import { DataTypes, Model, UUIDV4, Optional } from 'sequelize'
import database from '../database'
import Hash from '../services/Hash'

interface AdminAttributes {
  id: number,
  username: string,
  accessToken: string,
  password: string
}

interface AdminCreationAttributes extends
  Optional<AdminAttributes, 'id' | 'accessToken'> {}

export default class Admin extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes {
  public id!: number
  public username!: string
  public accessToken!: string
  public password!: string
}

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  accessToken: {
    type: DataTypes.UUIDV4,
    unique: true,
    allowNull: false,
    defaultValue: UUIDV4
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set (password: string) {
      this.setDataValue('password', new Hash(password).hash())
    }
  }
}, { sequelize: database });

(async () => await database.sync())()
