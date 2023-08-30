import { Order } from "../model/order"
import { OrderAdd } from "../model/orderAdd"
const orderValidator = require('../validator/orderValidator')
import { Customer } from "../model/customer"
const axios = require('axios');

module.exports.getOrderById = async function (id: number, token: string): Promise<Order> {
    try {
        const response = await axios.get('http://localhost:8080/api/orders/' + id, { params: { token: token } })

        return response.data
    } catch (e) {
        throw new Error('Could not get order')
    }
}

module.exports.getOrders = async function(token: string): Promise<Order> {
    try {
        const response = await axios.get('http://localhost:8080/api/orders-customer-names', { params: { token: token } }) 

        return response.data
    } catch (e) {
        throw new Error('could not get orders');
    }
}

module.exports.getCustomers = async function(token: string): Promise<Customer> {
    try {
        const response = await axios.get('http://localhost:8080/api/customers', { params: { token: token } })

        return response.data
    } catch (e) {
        throw new Error('could not get customers')
    }
}

module.exports.createOrder = async function (order: OrderAdd, token: string): Promise<Number> {
    const error: string = orderValidator.validateOrder(order)

    if (error) {
        throw new Error(error)
    }

    try {
        const response = await axios.post('http://localhost:8080/api/orders', order, { params: { token: token } })

        return response.data
    } catch (e) {
        throw new Error('Could not create order')
    }
}