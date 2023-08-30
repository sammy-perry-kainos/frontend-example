import {Request, Response} from "express"
import { Product } from "./model/product"
import { OrderAdd } from "./model/orderAdd"

const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const session = require('express-session');

const app = express();

// Configure Nunjucks
const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};

nunjucks.configure(appViews, nunjucksConfig);

// Configure Express
app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.use(express.urlencoded({ extended: true}))

app.use(session({secret: 'NOT HARDCODED SECRET', cookie: {maxAge: 60000}}))

declare module "express-session" {
    interface SessionData {
        product: Product;
        order: OrderAdd;
        token: string
    }
}

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// Express Routes
app.get('/', (req: Request, res: Response) => {
    res.render('pizza', {
        title: 'New Pizza Time!',
    });
});

require('./controller/authController')(app);

const authMiddleware = require('./middleware/auth')
app.use(authMiddleware)

require('./controller/orderController')(app);
require('./controller/productController')(app);

