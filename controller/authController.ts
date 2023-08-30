import { Request, Response, Application } from "express";
import { Login } from "../model/auth"
import { UserRole } from "../model/userRole"; 
const authService = require('../service/authService')

module.exports = function(app: Application) {
    app.get('/login',async (req: Request, res: Response) => {
        res.render('login')
    })

    app.post('/login', async (req: Request, res: Response) => {
        let data: Login = req.body 

        try {
            req.session.token = await authService.login(data)

            res.redirect('/products')
        } catch (e) {
            console.error(e)

            res.locals.errormessage = e.message

            res.render('login', req.body)
        }
    })

    app.get('/add-user', async (req: Request, res: Response) => {
        res.render('add-user')
    })

    app.post('/add-user', async (req: Request, res: Response) => {
        let data: UserRole = req.body
        let id: Number 

        data.roleID = 2

        console.log(data) 

        try {
            id = await authService.createUser(data)

            res.redirect('/login')
        } catch (e) {
            console.error(e)

            res.locals.errormessage = e.message

            res.render('add-user', req.body)
        }
    })
}