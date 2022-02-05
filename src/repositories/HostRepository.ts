import Host from '../models/Host'

export default class HostRepository {
  create (name: string, username: string, password: string) {
    return Host.create({ name, username, password })
  }

  findByUsername (username: string) {
    return Host.findOne({ where: { username } })
  }

  findByAccessToken (accessToken: string) {
    return Host.findOne({ where: { accessToken } })
  }

  list () {
    return Host.findAll({
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] }
    })
  }

  async updateLastMeetingAt (id: string) {
    const host = await Host.findOne({ where: { id } })
    if (host) {
      host.lastMeetingAt = new Date()
      host.save()
    }
  }

  async delete (id: string) {
    const host = await Host.findOne({ where: { id } })
    if (host) host.destroy()
  }
}
