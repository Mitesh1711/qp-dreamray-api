const express = require('express');
const authCheck = require('./../middleware/authCheck');
const NotificationModel = require('./../models/notificationModel');

const Sequelize = require('sequelize');
const op = Sequelize.Op;

const router = express.Router();

router.get('', authCheck, (req, res, next) => {
    NotificationModel.findAndCountAll({
        where: { toUserId: req.userData.userId }
    }).then(result => {
        res.json(result);
    })
})

module.exports = router;