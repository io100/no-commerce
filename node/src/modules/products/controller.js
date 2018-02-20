import db from '../../../models/index';


/**
 * @api {GET} /products Get all products
 * @apiPermission public
 * @apiVersion 1.0.0
 * @apiName Get All Products
 * @apiGroup Products
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "count": 20,
 *       "products": {
 *           "data": {
 *               ...products
 *           }
 *      }
 * 
 *  
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X GET localhost:5000/products
 */


export async function getAllProducts(ctx) {

   const products = await db.products.findAll({});
    
    ctx.status = 200;
    ctx.body = {
       status: 'success',
       count: products.length,
       products: {
           data: products
       }
   }

}

/**
 * @api {POST} /products Get all products
 * @apiPermission admin
 * @apiVersion 1.0.0
 * @apiName Add (Create) Product
 * @apiGroup Products 
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X POST localhost:5000/products
 */


export async function addProduct(ctx) {

    const body = ctx.body;

    const product = await db.products.create(...body);

    ctx.status = 201;
    ctx.body = {
        status: 'created',
        product: {
            data: product
        }
    }

}

/**
 * @api {DELETE} /products Get all products
 * @apiPermission admin
 * @apiVersion 1.0.0
 * @apiName Delete Product
 * @apiGroup Products 
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X DELETE localhost:5000/products
 */


export async function removeProduct(ctx) {
    
    const param = ctx.body.id ? {id: ctx.body.id} : {name: ctx.body.name};

    const deleted_product = await db.products.destroy({
        where: {param}
    })

    ctx.status = 200;
    ctx.body = {
        status: 'deleted',
        product: {
            data: deleted_product
        }
    }

}

/**
 * @api {PUT} /products Get all products
 * @apiPermission admin
 * @apiVersion 1.0.0
 * @apiName Update Product
 * @apiGroup Products 
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X PUT localhost:5000/products
 */

export async function updateProduct(ctx) {

    const params = ctx.body;

    const updated_product = await db.products.update(...params);

    ctx.status = 200;
    ctx.body = {
        product: {
            data: updated_product
        }
    }

}