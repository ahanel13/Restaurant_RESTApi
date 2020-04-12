const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency

//importing MenuItem and Ingredient models/schemas
const MenuItem = require('../models/menuItem');
const Ingredient = require('../models/ingredient');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/menuitems
router.get('/', (req, res, next) => {
    //finding all menuItems because no argument was given to find()
    MenuItem.find()
        //replacing ingredient_id with ingredient object with only a _id and name
        .populate('ingredients', 'name')
        .exec()
        .then(menuItems => {
            console.log(menuItems);
            //returns an array of menuItem objects each having an array of ingredient objects
            res.status(200).json({menuItems});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/menuitems/{menuitem_id}
router.get('/:employee_id', (req, res, next) => {
    //finding all menuItems because no argument was given to find()
    MenuItem.find({_id: req.params.employee_id})
        //replacing ingredient_id with ingredient object with only a _id and name
        .populate('ingredients', 'name')
        .exec()
        .then(menuItems => {
            console.log(menuItems);
            //returns an array of menuItem objects each having an array of ingredient objects
            res.status(200).json({menuItems});
        })
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            //returning server error
            res.status(500).json({
                error: err
            });gi 
        });
});

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/menuitems
router.post('/', (req, res, next) => {
    //creating new mongoose/mongodb document
    console.log(req.body.ingredients);
    const menuItem = new MenuItem({
        _id: new mongoose.Types.ObjectId(), //generating new mongoose/mongodb object id
        ingredients: req.body.ingredients,
        name: req.body.name,
        picture: req.body.picture,
        description : req.body.description ,
        price: req.body.price,
        nutrition: req.body.nutrition,
        item_type: req.body.item_type,
        category: req.body.category,
        prepared: req.body.prepared,
        paid: req.body.paid,
        special_instruct: req.body.instruct

    });
    //logging new doc in terminal
    console.log(menuItem);
    //saving doucment in mongodb
    menuItem.save()
        .then(result => {
            console.log(result);
            //returning successful response
            res.status(201).json({
                message: 'Menu item was added to the database'
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

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/menuitems/{menuitem_id}
router.put('/:menuitem_id', (req, res, next) => {
    // extracting menuitem id from url parameters
    const id = req.params.menuitem_id;

    // creating array to be used with $set 
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    // updating a menuitem with the new array using $set
    MenuItem.update({_id: id}, { $set: updateOps})
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


//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/menuItems/{menuItem_id}
router.delete('/:menuItem_id', (req, res, next) => {
    //finds and deletes a menuitem based on the given ID
    MenuItem.deleteOne({_id: req.params.menuItem_id})
        .exec()
        .then(result => {
            //returning successful response
            res.status(200).json({
                message: 'Menu item deleted',
                request: {
                    type: 'POST', 
                    url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/menuItems/'
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
});

//This is allowing the variable router to be used in other files?
module.exports = router;