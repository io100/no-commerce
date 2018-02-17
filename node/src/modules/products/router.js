import { ensureUser } from '../../middleware/validators';
import * as productsController from './controller'

export const baseUrl = '/products'

export default [
  { 
    // Get All Products
    method: 'GET',
    route: '/',
    handlers: [
      //ensureUser,
      productsController.getAllProducts
    ]
  }
]
