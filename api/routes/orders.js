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
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        menuItems = req.body.menuItems,
        send_to_kitchen = req.boby.send
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling PATCH request for orders'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling DELETE request for orders'
    });
});

//This is allowing the variable router to be used in other files?
module.exports = router;