import { NextFunction, Request, Response } from 'express'
import AuthMiddleware from './middlewares/AuthMiddleware'
import AdminController from './controllers/AdminController'
import HostController from './controllers/HostController'
import PrivacyController from './controllers/PrivacyController'

export default [
  {
    method: 'post',
    path: '/admin',
    controller (request: Request, response: Response) {
      return new AdminController(request, response).create()
    }
  },
  {
    method: 'get',
    path: '/admin',
    controller (request: Request, response: Response) {
      return new AdminController(request, response).read()
    }
  },
  {
    method: 'post',
    path: '/admin/signIn',
    controller (request: Request, response: Response) {
      return new AdminController(request, response).signIn()
    }
  },
  {
    method: 'get',
    path: '/admin/auth',
    middleware (request: Request, response: Response, next: NextFunction) {
      return new AuthMiddleware(request, response, next).admin()
    },
    controller (request: Request, response: Response) {
      return new AdminController(request, response).authStatus()
    }
  },
  {
    method: 'post',
    path: '/host',
    middleware (request: Request, response: Response, next: NextFunction) {
      return new AuthMiddleware(request, response, next).admin()
    },
    controller (request: Request, response: Response) {
      return new HostController(request, response).create()
    }
  },
  {
    method: 'post',
    path: '/privacy',
    middleware (request: Request, response: Response, next: NextFunction) {
      return new AuthMiddleware(request, response, next).admin()
    },
    controller (request: Request, response: Response) {
      return new PrivacyController(request, response).update()
    }
  },
  {
    method: 'get',
    path: '/privacy',
    controller (request: Request, response: Response) {
      return new PrivacyController(request, response).read()
    }
  },
  {
    method: 'post',
    path: '/host/signIn',
    controller (request: Request, response: Response) {
      return new HostController(request, response).signIn()
    }
  },
  {
    method: 'get',
    path: '/host/auth',
    middleware (request: Request, response: Response, next: NextFunction) {
      return new AuthMiddleware(request, response, next).host()
    },
    controller (request: Request, response: Response) {
      return new HostController(request, response).authStatus()
    }
  },
  {
    method: 'get',
    path: '/hosts',
    middleware (request: Request, response: Response, next: NextFunction) {
      return new AuthMiddleware(request, response, next).admin()
    },
    controller (request: Request, response: Response) {
      return new HostController(request, response).list()
    }
  },
  {
    method: 'delete',
    path: '/host',
    middleware (request: Request, response: Response, next: NextFunction) {
      return new AuthMiddleware(request, response, next).admin()
    },
    controller (request: Request, response: Response) {
      return new HostController(request, response).delete()
    }
  },
  {
    method: 'patch',
    path: '/host/lastMeetingAt',
    middleware (request: Request, response: Response, next: NextFunction) {
      return new AuthMiddleware(request, response, next).host()
    },
    controller (request: Request, response: Response) {
      return new HostController(request, response).updateLastMeetingAt()
    }
  }
]
