const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling GET request for employees'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'This endpoint is handling POST request for employees'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling PATCH request for employees'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'This endpoint is handling DELETE request for employees'
    });
});

//This is allowing the variable router to be used in other files?
module.exports = router;