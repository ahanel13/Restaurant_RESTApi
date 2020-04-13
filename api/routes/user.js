const express = require('express');     //adding express dependency
const router = express.Router();        //creating router for endpoint creation
const mongoose = require('mongoose');   //adding mongoose dependency
const bcrypt = require('bcrypt');       //used for hashing passwords

//importing User model/schema
const User = require('../models/user');


//GET https://dijkstras-steakhouse-restapi.herokuapp.com/user
router.get('/', (req, res, next) => {
    //finding all users because no argument was given
    User.find()
        .exec()
        .then(users => {
            console.log(users);
            res.status(200).json({users});
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

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/user/signup
router.post('/signup', (req, res, next) => {
    //checking if email exists
    User.find({ email: req.body.email.toLowerCase() }) 
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'Email already exisits'
                })
            } else { //Creating user here
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // if there was an error with hashing password
                    if(err){ 
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        });
                    } else { 
                        //creating user with hashed password
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(), //generating new mongoose/mongodb object id
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email.toLowerCase(),
                            password: hash,
                            birthday: req.body.birthday,
                            points: req.body.points,
                            coupons: req.body.coupons || null
                        });
                        //Storing new user in database
                        user.save() 
                            .then(result => {
                                console.log(result);
                                //returning successful response
                                res.status(201).json({
                                    message: 'User created',
                                    user: user
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
                    }
                });
            }
        });
    
    
});

//POST https://dijkstras-steakhouse-restapi.herokuapp.com/user/authentication
router.post('/authentication', (req, res, next) => {
    //checks if an email was passed in json
    if(req.body.email){
        //makes email lowercase of insenitive comparison
        const email = req.body.email.toLowerCase();
        //finds user based on the passed email
        User.findOne({email: email})
            .exec()
            .then(user => {
                if(user){
                    //if a user was found w/ email it compares the passed password with the stored password 
                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if(err){ // if there was an error with hashing password
                            console.log(err)
                            //returning server error
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            //succesful hashing comparison
                            console.log(result);
                            if(result){ 
                                //if the passwords were the same
                                console.log(user);
                                //returning user object
                                res.status(200).json({user});
                            } else {
                                //passwords were not the same, returning response
                                res.status(200).json({
                                    message: "Inncorrect Password",
                                });
                            }

                        }

                    });
                } else {
                    // this occures when the passed email does not match any user email
                    console.log(user);
                    res.status(200).json({
                        message: "Email does not exist",
                        user: user
                    });
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
    } else {
        //it no email was passed
        res.status(200).json({
            message: "Email was not provided"
        });
    }
});

//PUT https://dijkstras-steakhouse-restapi.herokuapp.com/user/{user_id}
router.put('/:user_id', (req, res, next) => {
    // extracting user id from url parameters
    const id = req.params.user_id;
    
    //creating a map from the passed array
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    //updating the found user with the new map
    User.update({_id: id}, { $set: updateOps})
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

//DELETE https://dijkstras-steakhouse-restapi.herokuapp.com/iser/{user_id}
router.delete('/:user_id', (req, res, next) => {
    //extracting id from url parameters
    const id = req.params.user_id;
    
    if(id == "destroyusers"){
        User.deleteMany()
            .exec()
            .then(result => {
                //returning successful response
                res.status(200).json({
                    message: 'All users have been deleted',
                    request: {
                        type: 'POST', 
                        url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/user/signup'
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
        //finds and deletes an user based on the given ID
        User.deleteOne({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'User deleted',
                    request: {
                        type: 'POST', 
                        url: 'https://dijkstras-steakhouse-restapi.herokuapp.com/user/signup'
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
    }
});

//This is allowing the variable router to be used in other files?
module.exports = router;