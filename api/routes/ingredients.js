const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency

//importing Ingredient model/schema
const Ingredient = require('../models/ingredient');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients
router.get('/', (req, res, next) => {
    //finding all ingredients because no argument was given
    Ingredient.find()
        .exec()
        .then(doc => {
            console.log(doc);
            //returning an array of ingredient objects
            res.status(200).json({doc});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients/{ingredientId}
router.get('/:ingredientId', (req, res, next) => {
    //extracting the ingredient ID from the URL endpoint
    const id = req.params.ingredientId;
    
    //searching a single ingredient by given ID   
    Ingredient.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                //returning ingredient object
                res.status(200).json(doc);
            } else {
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

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients
router.post('/', (req, res, next) => {
    //creating a mongoose document
    const ingredient = new Ingredient({
        _id: new mongoose.Types.ObjectId(),  //generating new mongoose/mongodb object id
        name: req.body.name,
        quantity: req.body.quantity
    });
    //saving the model to the database
    ingredient.save()
        .then(result => {
            console.log(result);
            //returning success response
            res.status(201).json({
                message: 'Ingredient was added to the database'
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

//PATCH https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients/{ingredientId}
router.put('/:ingredientId', (req, res, next) => {
    // extracting employee id from url parameters
    const id = req.params.ingredientId;

    //creating a map from the passed array
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    //updating the found ingredient with the new map
    Ingredient.update({_id: id}, { $set: updateOps})
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

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients/{ingredientId}
router.delete('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;
    Ingredient.deleteOne({_id: id})
        .exec()
        .then(result =>{
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

//This is allowing the variable router to be used in other files?
module.exports = router;