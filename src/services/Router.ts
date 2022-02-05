import { Express, Request, Response, NextFunction } from 'express'
import { map } from 'lodash'
import routes from '../routes'

export interface Route {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  path: string,
  middleware: (req: Request, res: Response, next: NextFunction) => void,
  controller: (req: Request, res: Response) => void
}

export default class Router {
  protected app: Express

  constructor (app: Express) {
    this.app = app
  }

  initialize () {
    return map(routes, (route: Route) => {
      return route.middleware
        ? this.app[route.method](route.path, route.middleware, route.controller)
        : this.app[route.method](route.path, route.controller)
    })
  }
}
