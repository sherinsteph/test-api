import { Request, Response } from 'express'
import Joi from 'joi'
import { omit } from 'lodash'
import HostRepository from '../repositories/HostRepository'
import Hash from '../services/Hash'
import Validation from '../services/Validation'

export default class HostController {
  protected request: Request

  protected response: Response

  protected hostRepo: HostRepository

  constructor (request: Request, response: Response) {
    this.request = request
    this.response = response
    this.hostRepo = new HostRepository()
  }

  async create () {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      username: Joi.string().alphanum().min(3).max(25).required(),
      password: Joi.string().min(6).max(25).required()
    })
    const { value, error } = new Validation(schema, this.request.body).validate()
    if (error) return this.response.status(422).json(error)
    const { name, username, password } = value
    const existingHost = await this.hostRepo.findByUsername(username)
    if (existingHost) {
      const error = { message: 'Username already taken' }
      return this.response.status(400).json(error)
    }
    const host: any = await this.hostRepo.create(name, username, password)
    delete host.password
    this.response.status(201).json(host)
  }

  async signIn () {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(25).required(),
      password: Joi.string().min(6).max(25).required()
    })
    const { value, error } = new Validation(schema, this.request.body).validate()
    if (error) return this.response.status(422).json(error)
    const { username, password } = value
    const host = await this.hostRepo.findByUsername(username)
    if (!host) {
      const error = { message: 'Invalid credentials' }
      return this.response.status(400).json(error)
    }
    const passwordValid = new Hash(password).verify(host.password)
    if (!passwordValid) {
      const error = { message: 'Invalid credentials' }
      return this.response.status(400).json(error)
    }
    const response = omit(host.toJSON(), ['password'])
    return this.response.json(response)
  }

  authStatus () {
    return this.response.json({ authenticated: true })
  }

  async list () {
    const hosts = await this.hostRepo.list()
    this.response.status(200).json(hosts)
  }

  async updateLastMeetingAt () {
    const schema = Joi.object({
      id: Joi.number().required()
    })
    const { value, error } = new Validation(schema, this.request.body).validate()
    if (error) return this.response.status(422).json(error)
    await this.hostRepo.updateLastMeetingAt(value.id)
    this.response.status(200).json({ updated: true })
  }

  async delete () {
    const schema = Joi.object({
      id: Joi.number().required()
    })
    const { value, error } = new Validation(schema, this.request.body).validate()
    if (error) return this.response.status(422).json(error)
    const { id } = value
    await this.hostRepo.delete(id)
    this.response.status(200).json({ deleted: true })
  }
}
