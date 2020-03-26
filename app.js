const express = require('express');
const app = express();
//const morgan = require('morgan');

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

/*  
Requests sent to these urls will be sent to the routes provided that
were imported at the beginning. Middleware */
app.get('/favicon.ico', (req, res) => res.status(200));
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