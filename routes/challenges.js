const express = require('express');
const authCheck = require('./../middleware/authCheck');
const ChallengesModel = require('./../models/challengeModel');

const router = express.Router();

router.get('', authCheck, (req, res, next) => {
    ChallengesModel.findAndCountAll({
        where: { user_id: req.userData.userId}
    }).then( result => {
        res.json(result);
    })
})

module.exports = router;