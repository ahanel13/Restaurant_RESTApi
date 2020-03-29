const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MenuItem = require('../models/menuItem');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling GET request for menuItems'
    });
});

router.post('/', (req, res, next) => {
    //creating mongoose model menuItem
    const menuItem = new MenuItem({
        _id: new mongoose.Types.Object(),
        ingredients: req.body.ingredients,
        name: req.body.name,
        picture: req.body.picture,
        desctription: req.body.desctription,
        price: req.body.price,
        nutrition: req.body.nutrition,
        item_type: req.body.item_type,
        category: req.body.category,
        paid: req.body.paid,
        special_instruct: req.body.instruct

    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling PATCH request for menuItems'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling DELETE request for menuItems'
    });
});

//This is allowing the variable router to be used in other files?
module.exports = router;