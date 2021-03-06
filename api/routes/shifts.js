const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency

//importing Shift and Employee models/schemas
const Shift = require('../models/shift');
const Employee = require('../models/employee');

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/shifts
router.get('/', (req, res, next) => {
    //this will return an array of shift objects
    Shift.find()
        .exec()
        .then(shifts => {
            console.log(shifts);
            //returns a json array
            res.status(200).json({shifts});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/shifts/{employee_id}
router.get('/:employee_id', (req, res, next) => {
    //finding all shifts for a specific employee
    Shift.find({employee_id: req.params.employee_id})
        .exec()
        .then(shifts => {
            console.log(shifts);
            //returns an array of shift objects for a single employee
            res.status(200).json({shifts});
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

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/shifts
router.post('/', (req, res, next) => {
    //checking to make sure the employee id passed actually matches an existing employee
    Employee.findById(req.body.employee_id)
        .exec()
        .then(doc => {
            //if an employee(doc) isn't returned this means no match was found
            if(!doc){
                return res.status(404).json({
                    message: 'Employee ID given does not match any ID'
                });
            }
            //creating new mongoose/mongodb document
            const shift = new Shift({
                _id: new mongoose.Types.ObjectId(), //generating new mongoose/mongodb object id
                employee_id: req.body.employee_id,
                clock_in: req.body.clock_in || Date.now()
            });
        
            //saving the document to the database and returns it for the next "then()"
            shift.save();
            return shift._id;
        })
        .then(shift => {
                console.log(shift);
                
                Employee.updateOne({_id: req.body.employee_id}, {$set: {current_shift: shift}})
                .exec()
                .then(otherResult => {
                    //returning successful response
                    res.status(201).json({
                        message: 'Shift was added to the database',
                        shift_id: shift
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

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/shifts/{shift_id}
router.put('/:shift_id', (req, res, next) => {
    // extracting shift id from url parameters
    const id = req.params.shift_id;
    
    // creating map to be used with $set 
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    // updating a shift with the new map using $set    
    Shift.update({_id: id}, { $set: updateOps})
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

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/shifts/{shift_id}
router.delete('/:shift_id', (req, res, next) => {
    const id = req.params.shift_id;

    if(id == "destroyshifts"){
        Shift.deleteMany()
        .exec()
        .then(result => {
            //returning successful response
            res.status(200).json({
                message: 'All shifts have been deleted',
                request: {
                    type: 'POST', 
                    url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/shifts'
                }
            })
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
        //finds and deletes an shift based on the given ID
        Shift.deleteOne({ _id: id })
            .exec()
            .then(result => {
                //returning successful response
                res.status(200).json({
                    message: 'Shift deleted',
                    request: {
                        type: 'POST', 
                        url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/shifts'
                    }
                })
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

//This is allowing the variable router to be used in other files?
module.exports = router;