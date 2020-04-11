const express = require('express');     //add express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency

//importing MenuItem and Order models/schemas
const MenuItem = require('../models/menuItem');
const Order = require('../models/order');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/orders
router.get('/', (req, res, next) => {
    //this is finding all orders because nothing was passed tothe find function
    Order.find()
    .exec()
    .then(Orders => {
        console.log(Orders);
        //returns a json array of order objects
        res.status(200).json({Orders});
    })
    //catching any errors that might have occured from above operation
    .catch(err => {
        console.log(err);
        //returning server error
        res.status(500).json({
            error: err
        });
    });
});

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/orders/{order_id}
router.get('/:order_id', (req, res, next) => {
    //extracting _id from the URL endpoint
    const id = req.params.order_id;

    //searching for an order by given ID
    Order.findById(id)
        .exec()
        .then(order => {
            //returns an order if found
            if(order){
                res.status(200).json(order);
            } 
            //returns a not found message if nothing was found
            else {
                res.status(404).json({
                    message: 'No vaild entry found for provided id'
                })
            }
        })
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            //returning server error
            res.status(500).json({
                error: err
            });
        });
});

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/orders
router.post('/', (req, res, next) => {
    //generating new mongoose document
    const order = new Order({
        _id: new mongoose.Types.ObjectId(), //generating new mongoose/mongodb object id
        menuItems: req.body.menuItems,
        send_to_kitchen: req.body.send
    });
    //saving document to mongodb
    order.save()
        .then(result => {
            //returning success message
            res.status(201).json({
                message: 'Order was added to the database'
            });
        })
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            //returning server error
            res.status(500).json({
                error: err
            });
        }); 
});

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/orders/{order_id}
router.put('/:order_id', (req, res, next) => {
    //extracting order_id from url parameter
    const id = req.params.order_id;
    
    //creating an array for $set for updating
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    //updaing the order with the array and order id
    Order.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result =>{
            console.log(result);
            //returning successful operation information
            res.status(200).json(result);
        })
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            //returning server error
            res.status(500).json({
                error: err
            });
        });
});

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/orders/{order_id}
router.delete('/:order_id', (req, res, next) => {
    //extracting order_id from url parameter
    id = req.params.order_id;
    
    //"function" for deleting all order documents from database
    if(id == "destroyorders"){
        Order.deleteMany()
            .exec()
            .then(result => {
                //returning successful message along with a post request
                res.status(200).json({
                    message: 'All orders have been deleted',
                    request: {
                        type: 'POST', 
                        url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/orders'
                    }
                })
            })
            //catching any errors that might have occured from above operation
            .catch(err => {
                console.log(err);
                //returning server error
                res.status(500).json({
                    error: err
                });
            });
    } else {
        //if the order is not equal  to destroyorders
        Order.deleteOne({_id: id})
            .exec()
            .then(result => {
                //returning successful message along with a post request
                res.status(200).json({
                    message: 'Order deleted',
                    request: {
                        type: 'POST', 
                        url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/orders'
                    }
                });
            })
            //catching any errors that might have occured from above operation
            .catch(err => {
                console.log(err);
                //returning server error
                res.status(500).json({
                    error: err
                });
            });
    }
});

//This is allowing the variable router to be used in other files?
module.exports = router;