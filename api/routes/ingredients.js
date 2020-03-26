const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling GET request for ingredients'
    });
});

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/ingredients/{ingredientId}
router.get('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;
    res.status(200).json({
        message: 'This endpoint is handling GET request for ingredients'
    });
});

router.post('/', (req, res, next) => {
    const ingredient = {
        name: req.body.name,
        quantity: req.body.quantity
    };
    console.log(ingredient);
    res.status(201).json({
        message: 'Ingredient was added to the database'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling PATCH request for ingredients'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling DELETE request for ingredients'
    });
});

//This is allowing the variable router to be used in other files?
module.exports = router;