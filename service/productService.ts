import { Product } from "../model/product"
const axios = require('axios');
const productValidator = require('../validator/productValidator')

module.exports.getProducts = async function(token: string): Promise<Product> {
    try {
        const response = await axios.get('http://localhost:8080/api/products', { params: { token: token } }) 

        return response.data
    } catch (e) {
        throw new Error('could not get products');
    }
}

module.exports.getProductById = async function (id: number, token: string): Promise<Product> {
    try {
        const response = await axios.get('http://localhost:8080/api/products/' + id, { params: { token: token } })

        return response.data
    } catch (e) {
        throw new Error('Could not get product')
    }
}

module.exports.createProduct = async function (product: Product, token: string): Promise<Number> {
    const error: string = productValidator.validateProduct(product)

    if (error) {
        throw new Error(error)
    }

    try {
        const response = await axios.post('http://localhost:8080/api/products/', product, { params: { token: token } })

        return response.data
    } catch(e) {
        throw new Error('Could not create product')
    }
}