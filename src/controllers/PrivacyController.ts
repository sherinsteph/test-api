import { Request, Response } from 'express'
import Joi from 'joi'
import Validation from '../services/Validation'
import PrivacyRepository from '../repositories/PrivacyRepository'

export default class PrivacyController {
  protected request: Request

  protected response: Response

  protected privacyRepo: PrivacyRepository

  constructor (request: Request, response: Response) {
    this.request = request
    this.response = response
    this.privacyRepo = new PrivacyRepository()
  }

  async update () {
    const schema = Joi.object({
      body: Joi.string().max(50000).required()
    })
    const { value, error } = new Validation(schema, this.request.body).validate()
    if (error) return this.response.status(422).json(error)
    await this.privacyRepo.createOrUpdate(value.body)
    this.response.status(200).json({ updated: true })
  }

  async read () {
    const privacy = await this.privacyRepo.getFirst()
    this.response.status(200).json(privacy)
  }
}
