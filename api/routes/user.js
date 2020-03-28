const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

//creating user
router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }) //checking if email exists
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({message: 'Email exisits'})
            } else { //Creating user here
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){ // if there was an error with hashing password
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        });
                    } else { //creating user with hashed password
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: hash,
                            birthday: req.body.birthday,
                            points: req.body.points 
                        });
                        user.save() //Storing new user in database
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created',
                                    user: user
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

router.delete('/:userId', (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json({doc});
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