import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize'
import database from '../database'
import Hash from '../services/Hash'

interface HostAttributes {
  id: number,
  name: string,
  username: string,
  accessToken: string,
  password: string,
  lastMeetingAt: Date
}

interface HostCreationAttributes extends
  Optional<HostAttributes, 'id' | 'accessToken' | 'lastMeetingAt'> {}

export default class Host extends Model<HostAttributes, HostCreationAttributes>
  implements HostAttributes {
  public id!: number
  public name!: string
  public username!: string
  public accessToken!: string
  public password!: string
  public lastMeetingAt!: Date
}

Host.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
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
  },
  lastMeetingAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, { sequelize: database });

(async () => await database.sync())()
