const express = require('express');
const AppraisalModel = require('./../models/appraisalModel');
const authCheck = require('./../middleware/authCheck');
const router = express.Router();

router.post('/create',authCheck, (req, res, next) => {
    console.log(req.userData.userId);
    const appraisal = {
        sender_user_id: req.userData.userId,
        receiver_user_id: req.body.userId,
        justification: req.body.justification,
        super: req.body.super
    }
    console.log(appraisal);

    AppraisalModel.create(appraisal).then( result => {
        res.json(result);
    })
})
module.exports = router;