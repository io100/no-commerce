import db from '../../models/index'
import {invoiceNumberGenerator} from '../../utils/utils'

export function helloWorld(ctx) {
    ctx.body = 'Hello World'
}

export function findOrder(ctx) {
    const order_number = ctx.params.order_number;
    const order_data = db.orders.findOne({where: {id: order_number}});

    ctx.body = {
        ...order_data
    }
}

export function createOrder(ctx) {

    let order = ctx.request.body;
    const customer_id = ctx.request.body.customer_id;

    order.status = 'created';
    order.invoice_number = invoiceNumberGenerator(customer_id);
    
    const order_data = db.orders.create(...order);

    ctx.status = 201;
    ctx.body = {
        ...order
    }
}


export function addToOrder(ctx) {



}

export function completeOrder(ctx) {



}