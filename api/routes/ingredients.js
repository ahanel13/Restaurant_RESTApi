const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Ingredient = require('../models/ingredient');

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients
router.get('/', (req, res, next) => {
    Ingredient.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json({doc});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients/{ingredientId}
router.get('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;
    Ingredient.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if(doc){
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No vaild entry found for provided id'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients
router.post('/', (req, res, next) => {
    //creating a mongoose model
    const ingredient = new Ingredient({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        quantity: req.body.quantity
    });
    //saving the model to the database
    ingredient.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Ingredient was added to the database'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });    
});

//PATCH https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients/{ingredientId}
router.put('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Ingredient.update({_id: id}, { $set: updateOps})
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

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients/{ingredientId}
router.delete('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;
    Ingredient.deleteOne({_id: id})
        .exec()
        .then(result =>{
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//This is allowing the variable router to be used in other files?
module.exports = router;