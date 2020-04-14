const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency

//importing Table, Employee, and Order models/schemas
const Table = require('../models/table');
const Employee = require('../models/employee');
const Order = require('../models/order');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/tables
router.get('/', (req, res, next) => {
    //this will return a table with the order object fully populated
    Table.find()
        //populating order_id with an order object for returning
        .populate('order_id')
        .exec()
        .then(tables => {
            console.log(tables);
            //returns a json array of table objects w/ the order_id being replaced with an order object
            res.status(200).json({tables});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/tables/employeeview
router.get('/employeeview', (req, res, next) => {
    //this will return a table object with just the order id
    Table.find()
        .exec()
        .then(tables => {
            console.log(tables);
            //returns an json array of table objects w/ just the order_id
            res.status(200).json({tables});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/tables/employeeview/{table_number}
router.get('/employeeview/:table_number', (req, res, next) => {
    //extracting the table number from url parameters
    const num = req.params.table_number;

    //atempting to find a table by the number passed
    Table.findOne({table_number: num})
        //populating order_id with an order object for returning
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
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            //returning server error
            res.status(500).json({
                error: err
            });
        });
});

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/tables/{table_number}
router.get('/:table_number', (req, res, next) => {
    //extracting table_number from url parameter
    const id = req.params.table_number;
    Table.findOne({table_number: id})
        //populating order_id with an order object for returning
        .populate('order_id')
        .exec()
        .then(doc => {
            //checking if a table was returned
            console.log(doc);
            console.log(doc.order_id == null);
            //if the table was found
            if(doc){
                //checking if the table has an order
                if(doc.order_id == null){
                    //creating new order for table if order_id == null
                    const order = new Order({
                        _id: new mongoose.Types.ObjectId(),
                        menuItems: null,
                        send_to_kitchen: false,
                        employee_id: doc.employee_id,
                        table_number: id
                    });
                    //saving order in database
                    order.save();
                    //adding new order to the table
                    doc.order_id = order._id;

                    //updating the table where table_id = to doc.id
                    Table.update({_id: doc._id}, { $set: doc})
                    .exec()
                    .then(result =>{
                        console.log(result);
                        res.status(200).json({
                            _id: doc._id,
                            user_ids: doc.user_ids,
                            table_number: doc.table_number,
                            employee_id: doc.employee_id,
                            order_id: order //returning the actual order object
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
                } else {
                    //if the table has an order already simple return the table info
                    console.log(doc);
                    res.status(200).json(doc);
                }
            } else {
                //the table number passed wasn't valid
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

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/tables
router.post('/', (req, res, next) => {
    //creating a mongoose model
    const table = new Table({
        _id: new mongoose.Types.ObjectId(), //generating new mongoose/mongodb object id
        user_ids: req.body.user_ids,
        table_number: req.body.table_number,
        employee_id: req.body.employee_id,
        order_id: req.body.order_id
    });
    //saving the model to the database
    table.save()
        .then(result => {
            //returning success message
            res.status(201).json({
                message: 'Table was added to the database'
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

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/tables/{table_id}
router.put('/:table_id', (req, res, next) => {
    //extracting table_id from url parameter
    const id = req.params.table_id;
    console.log(req.params.table_id);

    // this will set all tables' orders to null is removed orders is passed
    if(id == "removeorders"){
        //updating every document in Table so order_id = null
        Table.updateMany({}, {$set: {"order_id": null}})
            .exec()
            .then(doc =>{
                //prints out operation information
                console.log(doc);
                //returning successful operation information
                res.status(200).json(doc);
            })
            //catching any errors that might have occured from above operation
            .catch(err => {
                console.log(err);
                //returning server error
                res.status(500).json({
                    error: err
                });
            });
    } else {
        //creating an array for $set for updating
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }

        //updaing the table with the array and table id
        Table.update({_id: id}, { $set: updateOps})
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
    }
});

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/tables/{table_id}
router.delete('/:table_id', (req, res, next) => {
    //extracting table_id from url parameter
    const id = req.params.table_id;
    Table.deleteOne({_id: id})
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