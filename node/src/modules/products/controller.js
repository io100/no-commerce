var models  = require('../../../models');

export async function getAllProducts(ctx) {

   const products = await models.products.findAll({});
    
    ctx.status = 200;
    ctx.body = {
       status: 'success',
       count: products.length,
       users: {
           data: products
       }
   }

}


export async function addProduct(ctx) {

    const body = ctx.body;

    const product = await models.products.create(...body);

    ctx.status = 201;
    ctx.body = {
        status: 'created',
        product: {
            data: product
        }
    }

}


export async function removeProduct(ctx) {
    
    const param = ctx.body.id ? {id: ctx.body.id} : {name: ctx.body.name};

    const deleted_product = await models.products.destroy({
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

export async function updateProduct(ctx) {

    const params = ctx.body;

    const updated_product = await model.products.update(...params);

    ctx.status = 200;
    ctx.body = {
        product: {
            data: updated_product
        }
    }

}

export async function addImage(ctx) {
    // TODO
}