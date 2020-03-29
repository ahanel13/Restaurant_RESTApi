const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MenuItem = require('../models/menuItem');
const Ingredient = require('../models/ingredient');

router.get('/', (req, res, next) => {
    MenuItem.find()
        .populate('ingredients', 'name')
        .exec()
        .then(menuItems => {
            console.log(menuItems);
            res.status(200).json({menuItems});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    //creating mongoose model menuItem
    console.log(req.body.ingredients);
    const menuItem = new MenuItem({
        _id: new mongoose.Types.ObjectId(),
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
    console.log(menuItem);
    menuItem.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'menuItem was added to the database'
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
        message: 'This endpoint is handling PATCH request for menuItems'
    });
});


//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/menuItems/{menuItem_id}
router.delete('/:menuItem_id', (req, res, next) => {
    console.log(req.params.menuItem_id);
    MenuItem.deleteOne({_id: req.params.menuItem_id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Menu item deleted',
                request: {
                    type: 'POST', 
                    url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/menuItems/'
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