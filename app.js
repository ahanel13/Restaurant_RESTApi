const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const morgan = require('morgan');

//adding headers to avoid CORS errors
app.use((req, res, next) => {
    //giving access to any origin becuase it is a public api
    res.header('Access-Control-Allow-Origin', '*');
    //type of headers that can be sent with a request
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
});

//importing the routes
const compsRoutes = require('./api/routes/comps');
const employeesRoutes = require('./api/routes/employees');
const ingredientsRoutes = require('./api/routes/ingredients');
const menuItemsRoutes = require('./api/routes/menuItems');
const notificationsRoutes = require('./api/routes/notifications');
const ordersRoutes = require('./api/routes/orders');
const timeClockRoutes = require('./api/routes/timeClock');
const userRoutes = require('./api/routes/user');

//logs requests in terminal only in development
//app.use(morgan('dev'));

//allows the parsing of json data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*  
Requests sent to these urls will be sent to the routes provided that
were imported at the beginning. Middleware */
app.use('/comps', compsRoutes);
app.use('/employees', employeesRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/menuItems', menuItemsRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/orders', ordersRoutes);
app.use('/timeClock', timeClockRoutes);
app.use('/user', userRoutes);

//These execute if a request was sent to a route that doesn't exeist above
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status =  404;
    next(error);
});

//this catches all errors that will happen in the app
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;