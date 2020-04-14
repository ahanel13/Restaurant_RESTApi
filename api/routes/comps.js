const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency


//importing Employee and Comp model/schema
const Comp = require('../models/comp');
const Employee = require('../models/employee');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/comps
router.get('/', (req, res, next) => {
    //finding all comps because no argument was given
    Comp.find()
        .exec()
        .then(comps => {
            console.log(comps);
            //returning successful response
            res.status(200).json({comps});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/comps/{compId}
router.get('/:employeeId', (req, res, next) => {
    //extracting the employee ID from the URL endpoint
    const employeeId = req.params.employeeId;

    //searching for an all comps from a specific employee by given ID   
    Comp.find({employee_id: employeeId})
        .exec()
        .then(comp => {
            console.log(comp);
            //returning successful response
            res.status(200).json({comp});
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

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/comps
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
            const comp = new Comp({
                _id: new mongoose.Types.ObjectId(),
                employee_id: req.body.employee_id,
                menuItem_id: req.body.employee_id
            });
        
            //saving the document to the database
            return comp.save()
        })
        .then(comp => {
                console.log(comp);
                //returning successful response
                res.status(201).json({
                    message: 'Comp was added to the database'
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

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/comps/{compId}
router.put('/:comp_id', (req, res, next) => {
    const id = req.params.comp_id;
    const updateOps = {};

    //creating a map from the passed array
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    //updating the found comp with the passed array
    Comp.update({_id: id}, { $set: updateOps})
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

router.delete('/:comp_id', (req, res, next) => {
    //geting the comp id from the url
    const id = req.params.comp_id;

    // deleting single comp based on a matched id
    Comp.deleteOne({_id: id})
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