import { ensureUser } from '../../middleware/validators';
import * as cartController from './controller'

export const baseUrl = '/cart'

export default [
  { 
    method: 'GET',
    route: '/',
    handlers: [
      //ensureUser,
      cartController.helloWorld
    ]
  }
]
