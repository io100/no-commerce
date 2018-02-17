import { ensureUser, ensureSystemUser } from '../../middleware/validators';
import * as userController from './controller';
import * as photoController from '../photos/controller';

export const baseUrl = '/users'

export default [
  {
    method: 'GET',
    route: '/published',
    handlers: [
      ensureUser,
      userController.getPublishedUsers
    ]
  },
  {
    method: 'POST',
    route: '/check-role/:id',
    handlers: [
      userController.checkUserRole
    ]
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      ensureUser,
      userController.getUsers
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      // ensureUser,
      userController.getUser
    ]
  },
  {
    method: 'GET',
    route: '/:email/exists',
    handlers: [
      userController.getDoesUserExist
    ]
  },
  {
    method: 'POST',
    route: '/:id/reject',
    handlers: [
      ensureUser,
      userController.rejectUser
    ]
  },
  {
    method: 'PUT',
    route: '/:id/change-password',
    handlers: [
      ensureUser,
      userController.changePassword,
    ]
  },
  {
    method: 'POST',
    route: '/forgot-password',
    handlers: [
      userController.forgotPassword,
    ]
  },
  {
    method: 'POST',
    route: '/verify-reset',
    handlers: [
      userController.canUserResetPasword,
    ]
  },
  {
    method: 'POST',
    route: '/reset-password',
    handlers: [
      userController.resetPassword,
    ]
  },
  {
    method: 'PUT',
    route: '/:id/role',
    handlers: [
      ensureSystemUser,
      userController.updateRole
    ]
  }

]
