import { ensureUser } from '../../middleware/validators';
import * as cartController from './controller'

export const baseUrl = '/cart'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      cartController.createOrder
    ]
  },
  {
    method: 'PUT',
    route: '/:order_number',
    handlers: [
      ensureUser,
      cartController.addToOrder
    ]
  },
  {
    method: 'PUT',
    route: '/:order_number/checkout',
    handlers: [
      ensureUser,
      cartController.completeOrder
    ]
  },
    { 
    method: 'GET',
    route: '/:order_number',
    handlers: [
      ensureUser,
      cartController.getOrderNumber
    ]
  },
  {
    method: 'GET',
    route: '/',
    handlers: [
      ensureUser,
      cartController.getAllOrders
    ]
  }
]
