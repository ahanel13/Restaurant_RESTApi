const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Employee = require('../models/employee');

router.get('/', (req, res, next) => {
    if(req.body.username){
        const username = req.body.username.toLowerCase();
        Employee.findOne({username: username})
            .exec()
            .then(employee => {
                if(employee){
                    bcrypt.compare(req.body.password, employee.password, (err, result) => {
                        if(err){ // if there was an error with hashing password
                            console.log(err)
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            console.log(result);
                            if(result){
                                console.log(employee);
                                res.status(200).json({employee});
                            } else {
                                res.status(200).json({
                                    message: "Inncorrect Password",
                                    employee: null
                                });
                            }

                        }

                    });
                } else {
                    console.log(employee);
                    res.status(200).json({
                        message: "username does not exist",
                        employee: employee
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        Employee.find()
            .exec()
            .then(employees => {
                console.log(employees);
                res.status(200).json({employees});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

router.get('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    Employee.findById(id)
        .exec()
        .then(employee => {
            if(employee){
                res.status(200).json(employee);
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
    Employee.find({ username: req.body.username.toLowerCase() }) //checking if username exists
        .exec()
        .then(employee => {
            if(employee.length >= 1){
                return res.status(409).json({message: 'username exisits'})
            } else { //Creating employee here
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){ // if there was an error with hashing password
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        });
                    } else { //creating employee with hashed password
                        const employee = new Employee({
                            _id: new mongoose.Types.ObjectId(),
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            username: req.body.username.toLowerCase(),
                            password: hash,
                            position: req.body.position
                        });
                        employee.save() //Storing new employee in database
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Employee created',
                                    employee: employee
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

router.patch('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Employee.update({_id: id}, { $set: updateOps})
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

router.delete('/:employeeId', (req, res, next) => {
    Employee.deleteOne({ _id: req.params.employeeId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Employee deleted'
            })
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