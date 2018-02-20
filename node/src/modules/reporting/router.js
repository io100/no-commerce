import * as reportingController  from './controller';
import { ensureSystemUser } from '../../middleware/validators';

export const baseUrl = '/reporting'

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
     //ensureSystemUser,
     reportingController.helloWorld
    ]
  }
]
