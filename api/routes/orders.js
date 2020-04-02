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

router.post('/', (req, res, next) => {
    console.log(req.body.menuItems);
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        menuItems: req.body.menuItems,
        //send_to_kitchen: req.body.send
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

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling PATCH request for orders'
    });
});

router.delete('/:order_id', (req, res, next) => {
    console.log(req.params.order_id);
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
});

//This is allowing the variable router to be used in other files?
module.exports = router;