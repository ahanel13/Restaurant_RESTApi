const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Table = require('../models/table');
const Employee = require('../models/employee');
const Order = require('../models/order');

router.get('/', (req, res, next) => {
    //this will return a table with the order object fully populated
    Table.find()
        .populate('order_id')
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

router.get('/employeeview', (req, res, next) => {
    //this will return a table object with just the order id
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

router.get('/employeeview/:tableId', (req, res, next) => {
    const id = req.params.tableId;
    Table.findOne({_id: id})
        .populate('order_id')
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

router.get('/:table_number', (req, res, next) => {
    const id = req.params.table_number;
    Table.findOne({table_number: id})
        .populate('order_id')
        .exec()
        .then(doc => {
            //checking if a table was returned
            console.log(doc);
            console.log(doc.order_id == null);
            if(doc){
                //checking if the table has an order
                if(doc.order_id == null){
                    //creating new order for table
                    const order = new Order({
                        _id: new mongoose.Types.ObjectId(),
                        menuItems: null,
                        send_to_kitchen: false
                    });
                    //saving order in database
                    order.save();
                    //adding new order to the table
                    doc.order_id = order._id;

                    Table.update({_id: doc._id}, { $set: doc})
                    .populate('order_id')
                    .exec()
                    .then(result =>{
                        console.log(result);
                        res.status(200).json(doc);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                } else {
                    console.log(doc);
                    res.status(200).json(doc);
                }
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

router.put('/:tableId', (req, res, next) => {
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