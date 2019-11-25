const express = require('express');
const authCheck = require('./../middleware/authCheck');
const AnnouncementModel = require('./../models/announcementModel');

const router = express.Router();

router.get('', authCheck, (req, res, next) => {
    AnnouncementModel.findAndCountAll({
        where: {depId: req.userData.depId}
    }).then( result => {
        res.json(result);
    })
})

module.exports = router;