const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Shift = require('../models/shift');
const Employee = require('../models/employee');

router.get('/', (req, res, next) => {
    Shift.find()
        .exec()
        .then(shifts => {
            console.log(shifts);
            res.status(200).json({shifts});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:employee_id', (req, res, next) => {
    Shift.find({employee_id: req.params.employee_id})
        .exec()
        .then(shifts => {
            console.log(shifts);
            res.status(200).json({shifts});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    Employee.findById(req.body.employee_id)
    .exec()
    .then(doc => {
        if(!doc){
            return res.status(404).json({
                message: 'Employee ID given does not match any ID'
            });
        }
        //creating a mongoose model
        const shift = new Shift({
            _id: new mongoose.Types.ObjectId(),
            employee_id: req.body.employee_id,
            clock_in: req.body.clock_in
        });
    
        //saving the model to the database
        return shift.save()
    })
    .then(shift => {
            console.log(shift);
            res.status(201).json({
                message: 'Shift was added to the database'
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.put('/:shiftId', (req, res, next) => {
    const id = req.params.shiftId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Shift.update({_id: id}, { $set: updateOps})
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

router.patch('/:shiftId', (req, res, next) => {
    const id = req.params.shiftId;
    Shift.deleteOne({_id: id})
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