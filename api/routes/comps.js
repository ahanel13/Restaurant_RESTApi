const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comp = require('../models/comp');
const Employee = require('../models/employee');

router.get('/', (req, res, next) => {
    Comp.find()
        .exec()
        .then(comps => {
            console.log(comps);
            res.status(200).json({comps});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:employee_id', (req, res, next) => {
    Comp.find({employee_id: req.params.employee_id})
        .exec()
        .then(comp => {
            console.log(comp);
            res.status(200).json({comp});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:employee_id', (req, res, next) => {
    Comp.find({employee_id: req.params.employee_id})
        .exec()
        .then(comps => {
            console.log(comps);
            res.status(200).json({comps});
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
            const comp = new Comp({
                _id: new mongoose.Types.ObjectId(),
                employee_id: req.body.employee_id,
                menuItem_id: req.body.employee_id
            });
        
            //saving the model to the database
            return comp.save()
        })
        .then(comp => {
                console.log(comp);
                res.status(201).json({
                    message: 'Comp was added to the database'
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }); 
});

router.patch('/:comp_id', (req, res, next) => {
    const id = req.params.comp_id;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Comp.update({_id: id}, { $set: updateOps})
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

router.delete('/:comp_id', (req, res, next) => {
    const id = req.params.comp_id;
    Comp.deleteOne({_id: id})
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