const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency

//importing Notification and Employee models/schemas
const Notification = require('../models/notification');
const Employee = require('../models/employee');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/notifications
router.get('/', (req, res, next) => {
    //finding all notifications because no argument was given to find()
    Notification.find()
        .exec()
        .then(notifications => {
            console.log(notifications);
            //returns an array of notification objects
            res.status(200).json({notifications});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/notifications/{employee_id}
router.get('/:employee_id', (req, res, next) => {
    //finding all notifications for a specific employee
    Notification.find({employee_id: req.params.employee_id})
        .exec()
        .then(notifications => {
            console.log(notifications);
            //returns an array of notification objects for a single employee
            res.status(200).json({notifications});
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

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/notifications
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
            const notification = new Notification({
                _id: new mongoose.Types.ObjectId(), //generating new mongoose/mongodb object id
                employee_id: req.body.employee_id,
                sender: req.body.sender,
                notificationType: req.body.notificationType
            });
        
            //saving the document to the database and returns it for the next "then()"
            return notification.save()
        })
        .then(notification => {
                console.log(notification);
                //returning successful response
                res.status(201).json({
                    message: 'Notification was added to the database'
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

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/notifications/{notification_id}
router.put('/:notification_id', (req, res, next) => {
     // extracting notification id from url parameters
    const id = req.params.notification_id;

    // creating array to be used with $set 
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    // updating a notification with the new array using $set    
    Notification.update({_id: id}, { $set: updateOps})
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

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/notifications/{notification_id}
router.delete('/:notification_id', (req, res, next) => {
    //finds and deletes a notification based on the given ID
    Notification.deleteOne({_id: req.params.notification_id})
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