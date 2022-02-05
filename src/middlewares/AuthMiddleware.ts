import { NextFunction, Request, Response } from 'express'
import AdminRepository from '../repositories/AdminRepository'
import HostRepository from '../repositories/HostRepository'

export default class AuthMiddleware {
  protected request: Request

  protected response: Response

  protected next: NextFunction

  protected adminRepo: AdminRepository

  protected hostRepo: HostRepository

  constructor (request: Request, response: Response, next: NextFunction) {
    this.request = request
    this.response = response
    this.next = next
    this.adminRepo = new AdminRepository()
    this.hostRepo = new HostRepository()
  }

  protected unauthorizedAccess () {
    const error = { message: 'Please sign in' }
    return this.response.status(401).json(error)
  }

  protected getBearerToken () {
    const bearer = this.request.headers.authorization
    return bearer && bearer.split('Bearer ').pop()
  }

  protected async validate (type: 'admin' | 'host') {
    const accessToken = this.getBearerToken()
    if (!accessToken) return this.unauthorizedAccess()
    const repo = (type === 'admin') ? this.adminRepo
      : (type === 'host') ? this.hostRepo : null
    if (!repo) return this.unauthorizedAccess()
    const user = await repo.findByAccessToken(accessToken)
    if (!user) return this.unauthorizedAccess()
    return this.next()
  }

  async admin () {
    return this.validate('admin')
  }

  async host () {
    return this.validate('host')
  }
}
