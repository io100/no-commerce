import { ensureUser } from '../../middleware/validators';
import * as productsController from './controller'

export const baseUrl = '/products'

export default [
  { 
    method: 'GET',
    route: '/',
    handlers: [
      //ensureUser,
      productsController.getAllProducts
    ]
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
        productsController.addProduct
    ]
  },
  {
      method: 'PUT',
      route: '/',
      handlers: [
          productsController.updateProduct
      ]
  },
  {
      method: 'DELETE',
      route: '/',
      handlers: [
          productsController.removeProduct
      ]
    }
]
