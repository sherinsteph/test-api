import { first } from 'lodash'
import Admin from '../models/Admin'

export default class AdminRepository {
  create (username: string, password: string) {
    return Admin.create({ username, password })
  }

  async getFirst () {
    const admin = await Admin.findAll({
      limit: 1,
      attributes: { exclude: ['accessToken', 'password'] }
    })
    return first(admin)
  }

  findByUsername (username: string) {
    return Admin.findOne({ where: { username } })
  }

  findByAccessToken (accessToken: string) {
    return Admin.findOne({ where: { accessToken } })
  }
}
