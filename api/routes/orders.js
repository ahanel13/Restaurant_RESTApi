const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MenuItem = require('../models/menuItem');
const Order = require('../models/order');

router.get('/', (req, res, next) => {
    Order.find()
    //.populate('ingredients', 'name')
    .exec()
    .then(Orders => {
        console.log(Orders);
        res.status(200).json({Orders});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/orders/{orderId}
router.get('/:orderId', (req, res, next) => {
    //extracting _id from the URL endpoint
    const id = req.params.orderId;

    //searching for an order by given ID
    Order.findById(id)
        .exec()
        .then(order => {

            //returns an order if found
            if(order){
                res.status(200).json(order);
            } 
            //returns an error if nothing was found
            else {
                res.status(404).json({
                    message: 'No vaild entry found for provided id'
                })
            }
        })
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    console.log(req.body.menuItems);
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        menuItems: req.body.menuItems,
        send_to_kitchen: req.body.send
    });

    console.log(order);
    order.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'order was added to the database'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }); 
});

router.put('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Order.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result =>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/orders/{orderId}
router.delete('/:order_id', (req, res, next) => {
    id = req.params.order_id;
    
    if(id == "destroyorders"){
        Order.deleteMany()
            .exec()
            .then(result => {
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
        Order.deleteOne({_id: req.params.order_id})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Order deleted',
                    request: {
                        type: 'POST', 
                        url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/orders'
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }
});

//This is allowing the variable router to be used in other files?
module.exports = router;