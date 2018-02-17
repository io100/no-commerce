import * as authControler from './controller'

export const baseUrl = '/auth'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      authControler.authUser
    ]
  }
]
