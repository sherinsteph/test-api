import { first } from 'lodash'
import Privacy from '../models/Privacy'

export default class PrivacyRepository {
  async getFirst () {
    const privacies = await Privacy.findAll({ limit: 1 })
    return first(privacies)
  }

  async createOrUpdate (body: string) {
    const privacy = await this.getFirst()
    if (privacy) {
      privacy.body = body
      await privacy.save()
    } else {
      await Privacy.create({ body })
    }
  }
}
