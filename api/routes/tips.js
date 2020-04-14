const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency

//importing Employee and Tip model/schema
const Tip = require('../models/tip');
const Employee = require('../models/employee');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/tips
router.get('/', (req, res, next) => {
    //finding all tips because no argument was given
    Tip.find()
        .exec()
        .then(tips => {
            console.log(tips);
            //returning an array of tip objects
            res.status(200).json({tips});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/tips/{tipId}
router.get('/:employeeId', (req, res, next) => {
    //extracting the employee ID from the URL endpoint
    const employeeId = req.params.employeeId;

    //searching for an all tips from a specific employee by given ID   
    Tip.find({employee_id: employeeId})
        .exec()
        .then(tip => {
            console.log(tip);
            //returning successful response
            res.status(200).json({tip});
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

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/tips
router.post('/', (req, res, next) => {
    //making sure that the employeeId that was passed is valid by finding the employee
    Employee.findById(req.body.employee_id)
        .exec()
        .then(doc => {
            if(!doc){
                //if employee id is not valid
                return res.status(404).json({
                    message: 'Employee ID given does not match any ID'
                });
            }
            //creating a mongoose document
            const tip = new Tip({
                _id: new mongoose.Types.ObjectId(), //generating new mongoose/mongodb object id
                employee_id: req.body.employee_id,
                tip_amount: req.body.tip_amount
            });
        
            //saving the document to the database
            return tip.save()
        })
        .then(tip => {
                console.log(tip);
                //returning successful response
                res.status(201).json({
                    message: 'Tip was added to the database'
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

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/tips/{tipId}
router.put('/:tip_id', (req, res, next) => {
    const id = req.params.tip_id;
    const updateOps = {};

    //creating a map from the passed array
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    //updating the found tip with the passed array
    Tip.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result =>{
            console.log(result);
            //returning successful response
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

router.delete('/:tip_id', (req, res, next) => {
    //geting the tip id from the url
    const id = req.params.tip_id;

    // deleting single tip based on a matched id
    Tip.deleteOne({_id: id})
        .exec()
        .then(result =>{
            //returning successful response
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