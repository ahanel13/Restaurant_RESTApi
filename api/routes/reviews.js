const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency


//importing Employee and Review model/schema
const Review = require('../models/review');
const Employee = require('../models/employee');
const Order = require('../models/order');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/reviews
router.get('/', (req, res, next) => {
    //finding all reviews because no argument was given
    Review.find()
        .exec()
        .then(reviews => {
            console.log(reviews);
            //returning successful response
            res.status(200).json({reviews});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/reviews/{employee_Id}
router.get('/:employee_Id', (req, res, next) => {
    //extracting the employee ID from the URL endpoint
    const employeeId = req.params.employee_Id;

    //searching for an all reviews from a specific employee by given ID   
    Review.find({employee_id: employeeId})
        .exec()
        .then(review => {
            console.log(review);
            //returning successful response
            res.status(200).json({review});
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

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/reviews
router.post('/', (req, res, next) => {
    console.log(req.body.employee_id);
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
            const review = new Review({
                _id: new mongoose.Types.ObjectId(),
                employee_id: req.body.employee_id,
                order_id: req.body.order_id,
                question01_rating: req.body.question01_rating,
                question01_reason: req.body.question01_reason,
                question02_rating: req.body.question02_rating,
                question02_reason: req.body.question02_reason,
                question03_rating: req.body.question03_rating,
                question03_reason: req.body.question03_reason,
            });
        
            //saving the document to the database
            return review.save()
        })
        .then(review => {
                console.log(review);
                //returning successful response
                res.status(201).json({
                    message: 'Review was added to the database'
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

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/reviews/{reviewId}
router.put('/:review_id', (req, res, next) => {
    const id = req.params.review_id;
    const updateOps = {};

    //creating a map from the passed array
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    //updating the found review with the passed array
    Review.update({_id: id}, { $set: updateOps})
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

router.delete('/:review_id', (req, res, next) => {
    //geting the review id from the url
    const id = req.params.review_id;

    //extra endpoint for removing all the data
    if(id == "destroyreviews"){
        Review.deleteMany()
            .exec()
            .then(result => {
                //returning successful message along with a post request
                res.status(200).json({
                    message: 'All reviews have been deleted',
                    request: {
                        type: 'POST', 
                        url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/reviews'
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
        // deleting single review based on a matched id
        Review.deleteOne({_id: id})
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
    }
});

//This is allowing the variable router to be used in other files?
module.exports = router;