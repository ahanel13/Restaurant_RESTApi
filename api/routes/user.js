const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

//creating user
router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email.toLowerCase() }) //checking if email exists
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({message: 'Email already exisits'})
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
                            email: req.body.email.toLowerCase(),
                            password: hash,
                            birthday: req.body.birthday,
                            points: req.body.points || 0
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

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    User.update({_id: id}, { $set: updateOps})
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
    if(req.body.email){
        const email = req.body.email.toLowerCase();
        User.findOne({email: email})
            .exec()
            .then(user => {
                if(user){
                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if(err){ // if there was an error with hashing password
                            console.log(err)
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            console.log(result);
                            if(result){
                                console.log(user);
                                res.status(200).json({user});
                            } else {
                                res.status(200).json({
                                    message: "Inncorrect Password",
                                });
                            }

                        }

                    });
                } else {
                    console.log(user);
                    res.status(200).json({
                        message: "Email does not exist",
                        user: user
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
        User.find()
            .exec()
            .then(users => {
                console.log(users);
                res.status(200).json({users});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

router.delete('/drop-all-users', (req, res, next) => {
   
});

//This is allowing the variable router to be used in other files?
module.exports = router;