import { Order } from "../model/order"
import { OrderAdd } from "../model/orderAdd"
import { Customer } from "../model/customer"
import {Request, Response, Application} from "express"
const orderService = require('../service/orderService')

module.exports = function(app: Application) {

    app.get('/orders', async (req: Request, res: Response) => {
        let data: Order[]

        try {
            data = await orderService.getOrders(req.session.token)
        } catch (e) {
            console.error(e);
        }

        res.render('list-orders', {orders: data})
    })

    app.get('/orders/:id', async (req: Request, res: Response) => {
        let data: Order

        try {
            data = await orderService.getOrderById(req.params.id, req.session.token)

            console.log(data.orderId)
        } catch (e) {
            console.error(e)
        }

        res.render('view-order', {order: data})
    })

    app.get('/add-order', async (req: Request, res: Response) => {
        let data: Customer

        try {
            data = await orderService.getCustomers(req.session.token)

            console.log(data)
        } catch (e) {
            console.error(e)
        }

        res.render('add-order', {customers : data, current_date: new Date().toISOString().substring(0,10)})
    })

    app.post('/add-order', async (req: Request, res: Response) => {
        let data: OrderAdd = req.body
        let id: Number

        try {
            id = await orderService.createOrder(data, req.session.token)

            res.redirect('/orders/' + id)
        } catch (e) {
            console.error(e)

            // res.locals.errormessage = e.message

            let custData: Customer

            try {
                custData = await orderService.getCustomers(req.session.token)

                console.log(data)
            } catch (e) {
                console.error(e)
            }

            res.render('add-order', {customers : custData, current_date: data.orderDate, errormessage: e.errormessage})
        }
    })

    app.get('/add-order-customer', async (req: Request, res: Response) => {
        if (!req.session.order) {
            req.session.order = {}
        }

        let data: Customer

        try {
            data = await orderService.getCustomers(req.session.token)

            console.log(data)
        } catch (e) {
            console.error(e)
        }

        res.render('add-order-customer', {customers : data})
    })

    app.post('/add-order-customer', async (req: Request, res: Response) => {
        req.session.order["customerID"] = req.body.customerID

        res.redirect('/add-order-date')
    })

    app.get('/add-order-date',async (req: Request, res: Response) => {
        res.render('add-order-date')
    })

    app.post('/add-order-date', async (req: Request, res: Response) => {
        req.session.order["orderDate"] = req.body.orderDate

        res.redirect('/add-order-confirmation')
    })

    app.get('/add-order-confirmation', async (req: Request, res: Response) => {
        res.render('add-order-confirmation', req.session.order)
    })

    app.post('/add-order-confirmation', async (req: Request, res: Response) => {
        let data: OrderAdd = req.session.order 
        let id: Number 

        try {
            id = await orderService.createOrder(data, req.session.token) 

            req.session.product = undefined

            res.redirect('/orders/' + id)
        } catch (e) {
            console.error(e) 
            
            res.locals.errormessage = e.message 

            res.render('add-order-confirmation', req.session.order)
        }
    })
}
