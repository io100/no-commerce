import * as reportingController  from './controller';
import { ensureSystemUser } from '../../middleware/validators';

export const baseUrl = '/reporting'

export default [
  {
    method: 'POST',
    route: '/users',
    handlers: [
     ensureSystemUser,
     reportingController.getUsersForDateRange
    ]
  }
]
