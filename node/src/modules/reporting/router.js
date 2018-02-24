import * as reportingController  from './controller';
import { ensureUser } from '../../middleware/validators';

export const baseUrl = '/reporting'

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
     ensureUser,
     reportingController.helloWorld
    ]
  }
]
