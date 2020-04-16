const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency

//importing Coupon and MenuItem models/schemas
const Coupon = require('../models/coupon');
const MenuItem = require('../models/menuItem');

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/coupons
router.get('/', (req, res, next) => {
    //finding all coupons because no argument was given to find()
    Coupon.find()
    .exec()
    .then(coupons => {
        console.log(coupons);
        //returns array of coupon objects
        res.status(200).json({coupons});
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

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/coupons/{couponId}
router.get('/:couponId', (req, res, next) => {
    //extracting _id from the URL endpoint
    const id = req.params.couponId;

    //searching for an coupon by given ID
    Coupon.findById(id)
        .exec()
        .then(coupon => {

            //returns an coupon if found
            if(coupon){
                //returning successful response
                res.status(200).json(coupon);
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
            //returning server error
            res.status(500).json({
                error: err
            });
        });
});

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/coupon
router.post('/', (req, res, next) => {
    //creating temporary coupon with information passed in json
    const coupon = new Coupon({
        _id: new mongoose.Types.ObjectId(), //generating new mongoose/mongodb object id
        couponType: req.body.couponType, 
        requiredItems: req.body.requiredItems,
        appliedItems: req.body.appliedItems,
        discount: req.body.discount,
        active: req.body.active,
        repeatable:  req.body.repeatable,
        description: req.body.description    
    });
    //logging new doc in terminal
    console.log(coupon);
    //saving new Coupon to the database
    coupon.save()
        .then(result => {
            console.log(result);
            //returning successful response
            res.status(201).json({
                message: 'Coupon was added to the database',
                _id: coupon._id
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

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/coupons/{couponId}
router.put('/:couponId', (req, res, next) => {
    const id = req.params.couponId;
    const updateOps = {};

    //creating a map from the passed array
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    //updating the found coupon with the passed array
    Coupon.update({_id: id}, { $set: updateOps})
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

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/coupons/{couponId}
router.delete('/:couponId', (req, res, next) => {
    //finds and deletes a coupon based on the given ID
    Coupon.deleteOne({_id: req.params.couponId})
        .exec()
        .then(result => {
            //returning successful response
            res.status(200).json({
                message: 'Coupon deleted',
                request: {
                    type: 'POST', 
                    url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/coupons'
                }
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

//This is allowing the variable router to be used in other files?
module.exports = router;