import { ensureUser } from '../../middleware/validators';
import * as photoController from './controller'

export const baseUrl = '/photos'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      // ensureUser,
      photoController.createPhoto
    ]
  },
  {
    method: 'DELETE',
    route: '/',
    handlers: [
      // ensureUser,
      photoController.deletePhoto
    ]
  }
]
