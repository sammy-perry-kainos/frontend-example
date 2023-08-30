import {OrderAdd} from "../model/orderAdd"

module.exports.validateOrder = function (order: OrderAdd): string {
    var date = new Date()
    var orderDate = new Date(order.orderDate)
    date.setFullYear(2022)

    if (orderDate < date) {
        return "Date is older than a year";
    }

    return null
}