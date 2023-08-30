import { Login } from "../model/auth";
import { UserRole } from "../model/userRole";
const axios = require('axios');

module.exports.login = async function (login: Login): Promise<void> {
    try {
        const response = await axios.post('http://localhost:8080/api/login', login)

        return response.data
    } catch (e) {
        throw new Error('Could not login')
    }
}

module.exports.createUser = async function (user: UserRole): Promise<Number> {
    // validation handling

    try {
        const response = await axios.post('http://localhost:8080/api/register', user)

        return response.data
    } catch (e) {
        throw new Error('Could not create order')
    }
}