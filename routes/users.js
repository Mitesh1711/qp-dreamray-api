const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const authCheck = require('./../middleware/authCheck');

const router = express.Router();

router.post('/register', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {

        newUser = {
            email: req.body.email,
            password_hash: hash,
            name: req.body.name,
            surname: req.body.surname
        }
        UserModel.findOrCreate({
            where: { email:req.body.email }, defaults: newUser
        }).then(([user, status]) => {
            
            if(!status){
                return res.status(409).json({
                    message: 'Email already exists, please try reset password or use different email!'
                })
            }
            return res.status(200).json({
                message: 'User added successfully!'
            })
        });
       
    })
})

router.post('/login', (req, res, next) => {
    let fetchedUser;
    UserModel.findAll({
        where: {
            email: req.body.email
        }
    }).then(user => {
        console.log(user)
        if(user.length === 0){
            return res.status(404).json({
                message: 'user not found'
            })
        }
        user = JSON.parse(JSON.stringify(user));
        fetchedUser = user[0];
        bcrypt.compare(req.body.password, fetchedUser.password_hash).then(
            result => {
                if (!result) {
                    return res.status(401).json({
                        message: 'Incorrect password, please try again'
                    })
                }
                const token = jwt.sign(                            
                    { email: fetchedUser.email, id: fetchedUser.id, depId: fetchedUser.depId },
                    "secret_this_should_be_longer",
                    { expiresIn: '1h' }
                );
                res.status(200).json({
                    name: fetchedUser.name + ' ' +fetchedUser.surname,
                    token: token,
                    expiresIn: 3600
                })
            })
            .catch(error => {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            });
    })
})

router.get('/userNames', authCheck, (req, res, next) => {
    UserModel.findAll().then(result => {
        const currentUser = req.userData.userId;
        const userNames = result.map(user => ({
            id: user.id,
            name: user.name + ' ' + user.surname
        }))
        for (let user of userNames) {
            if (user.id === currentUser) {
                let index = userNames.indexOf(user);
                userNames.splice(index, 1);
            }
        }
        res.json(userNames)
    })
})

module.exports = router;