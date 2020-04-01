const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Table = require('../models/table');

router.get('/', (req, res, next) => {
    Table.find()
        .exec()
        .then(tables => {
            console.log(tables);
            res.status(200).json({tables});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:tableId', (req, res, next) => {
    const id = req.params.tableId;
    Table.findById(id)
        .exec()
        .then(doc => {
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

router.post('/', (req, res, next) => {
    //creating a mongoose model
    const table = new Table({
        _id: new mongoose.Types.ObjectId(),
        user_ids: req.body.user_ids,
        table_number: req.body.table_number,
        employee_id: req.body.employee_id,
        order_id: req.body.order_id
    });
    //saving the model to the database
    table.save()
        .then(result => {
            res.status(201).json({
                message: 'Table was added to the database'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }); 
});

router.patch('/:tableId', (req, res, next) => {
    const id = req.params.tableId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Table.update({_id: id}, { $set: updateOps})
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

router.delete('/:tableId', (req, res, next) => {
    const id = req.params.tableId;
    Table.deleteOne({_id: id})
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