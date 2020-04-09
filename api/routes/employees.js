const express = require('express');     //add express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency
const bcrypt = require('bcrypt');       //used for hashing passwords


//importing Employee model/schema
const Employee = require('../models/employee');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/employees
router.get('/', (req, res, next) => {
    //finding all employees because no argument was given
    Employee.find()
        .exec()
        .then(employees => {
            console.log(employees);
            res.status(200).json({employees});
        })
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/employees/{employeeId}
router.get('/:employeeId', (req, res, next) => {
    //extracting _id from the URL endpoint
    const id = req.params.employeeId;

    //searching for an employee by given ID
    Employee.findById(id)
        .exec()
        .then(employee => {

            //returns an employee if found
            if(employee){
                res.status(200).json(employee);
            } 
            //returns an error if nothing was found
            else {
                res.status(404).json({
                    message: 'No vaild entry found for provided id'
                })
            }
        })
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/employees/authentication
router.post('/authentication', (req, res, next) => {
    //if a usename was passed then the if statment will execute
    if(req.body.username){    
        //making username case insensitive
        const username = req.body.username.toLowerCase();

        //looking for an employee by the passed username
        Employee.findOne({username: username})
            .exec()
            .then(employee => {
                if(employee){
                    //encyrpting the passed password and comparing with stored password
                    bcrypt.compare(req.body.password, employee.password, (err, result) => {
                        
                        if(err){ // if there was an error with comparing the password
                            return res.status(500).json({
                                error: err
                            });
                        } else { // if no error occured with the comparison

                            //if comparison found something with the password given it will return it in result
                            if(result){
                                console.log(employee);
                                res.status(200).json({employee});
                            } else { //if nothing was found
                                res.status(200).json({
                                    message: "Inncorrect Password",
                                    employee: null
                                });
                            }
                        }
                    });
                } else { //if no employee was found by passed username
                    console.log(employee);
                    res.status(200).json({
                        message: "username does not exist",
                        employee: employee
                    });
                }
            })
            //catching any errors that might have occured from above operation
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        res.status(200).json({
            message: "Username was not provided"
        });
    }
});

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/employees
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
                            //catching any errors that might have occured from above operation
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


//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/employees/{employeeId}
router.put('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    const updateOps = {};

    //creating a map from the passed array
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    //updating the found employee with the passed array
    Employee.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result =>{
            console.log(result);
            res.status(200).json(result);
        })
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/employees/{employeeId}
router.delete('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;

    if(id == "destroyemployees"){
        Employee.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'All employees have been deleted',
                request: {
                    type: 'POST', 
                    url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/employees'
                }
            })
        })
        //catching any errors that might have occured from above operation
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    } else {
        //finds and deletes an employee based on the given ID
        Employee.deleteOne({ _id: req.params.employeeId })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Employee deleted',
                    request: {
                        type: 'POST', 
                        url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/employees'
                    }
                })
            })
            //catching any errors that might have occured from above operation
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

//This is allowing the variable router to be used in other files?
module.exports = router;