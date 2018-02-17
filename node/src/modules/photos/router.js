import { ensureUser } from '../../middleware/validators';
import * as photoController from './controller'

export const baseUrl = '/photos'

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      // ensureUser,
      photoController.getPhotos
    ]
  },
  {
    method: 'POST',
    route: '/:id/reject',
    handlers: [
      // ensureUser,
      photoController.rejectPhoto
    ]
  },
  {
    method: 'POST',
    route: '/:id/accept',
    handlers: [
      // ensureUser,
      photoController.acceptPhoto
    ]
  }
]
