const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Notification = require('../models/notification');
const Employee = require('../models/employee');

router.get('/', (req, res, next) => {
    Notification.find()
        .exec()
        .then(notifications => {
            console.log(notifications);
            res.status(200).json({notifications});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:employee_id', (req, res, next) => {
    Notification.find({employee_id: req.params.employee_id})
        .exec()
        .then(notifications => {
            console.log(notifications);
            res.status(200).json({notifications});
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
            const notification = new Notification({
                _id: new mongoose.Types.ObjectId(),
                employee_id: req.body.employee_id,
                sender: req.body.sender,
                notificationType: req.body.notificationType
            });
        
            //saving the model to the database
            return notification.save()
        })
        .then(notification => {
                console.log(notification);
                res.status(201).json({
                    message: 'Notification was added to the database'
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });   
});

router.put('/:notificationId', (req, res, next) => {
    const id = req.params.notificationId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Notification.update({_id: id}, { $set: updateOps})
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

router.delete('/:notificationId', (req, res, next) => {
    const id = req.params.notificationId;
    Notification.deleteOne({_id: id})
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