import { Request, Response } from 'express'
import Joi from 'joi'
import { omit } from 'lodash'
import AdminRepository from '../repositories/AdminRepository'
import Hash from '../services/Hash'
import Validation from '../services/Validation'

export default class AdminController {
  protected request: Request

  protected response: Response

  protected adminRepo: AdminRepository

  constructor (request: Request, response: Response) {
    this.request = request
    this.response = response
    this.adminRepo = new AdminRepository()
  }

  async create () {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(25).required(),
      password: Joi.string().min(6).max(25).required(),
      confirmPassword: Joi.equal(Joi.ref('password')).required()
    })
    const { value, error } = new Validation(schema, this.request.body).validate()
    if (error) return this.response.status(422).json(error)
    const { username, password } = value
    const admin = await this.adminRepo.findByUsername(username)
    if (admin) {
      const error = { message: 'Username already taken' }
      return this.response.status(400).json(error)
    }
    await this.adminRepo.create(username, password)
    this.response.status(201).json({ created: true })
  }

  async read () {
    const admin = await this.adminRepo.getFirst()
    return this.response.json(admin)
  }

  async signIn () {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(25).required(),
      password: Joi.string().min(6).max(25).required()
    })
    const { value, error } = new Validation(schema, this.request.body).validate()
    if (error) return this.response.status(422).json(error)
    const { username, password } = value
    const admin = await this.adminRepo.findByUsername(username)
    if (!admin) {
      const error = { message: 'Invalid credentials' }
      return this.response.status(400).json(error)
    }
    const passwordValid = new Hash(password).verify(admin.password)
    if (!passwordValid) {
      const error = { message: 'Invalid credentials' }
      return this.response.status(400).json(error)
    }
    const response = omit(admin.toJSON(), ['password'])
    return this.response.json(response)
  }

  authStatus () {
    return this.response.json({ authenticated: true })
  }
}
