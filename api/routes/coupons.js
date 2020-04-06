const express = require('express');     //add express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency

//importing Coupon and MenuItem model/schema
const Coupon = require('../models/coupon');
const MenuItem = require('../models/menuItem');

//GET https://dijkstras-steakhouse-restapi.herokuapp.com/coupons
router.get('/', (req, res, next) => {
    //finding all coupons because no argument was given to find()
    Coupon.find()
    .exec()
    .then(coupons => {
        console.log(coupons);
        res.status(200).json({coupons});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.post('/', (req, res, next) => {
    console.log(req.body.menuItems);
    const Coupon = new Coupon({
        _id: new mongoose.Types.ObjectId(),
        menuItems: req.body.menuItems,
        send_to_kitchen: req.body.send
    });

    console.log(Coupon);
    Coupon.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Coupon was added to the database'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }); 
});

router.put('/:CouponId', (req, res, next) => {
    const id = req.params.CouponId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Coupon.update({_id: id}, { $set: updateOps})
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

router.delete('/:Coupon_id', (req, res, next) => {
    console.log(req.params.Coupon_id);
    Coupon.deleteOne({_id: req.params.Coupon_id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Coupon deleted',
                request: {
                    type: 'POST', 
                    url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/Coupons'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//This is allowing the variable router to be used in other files?
module.exports = router;