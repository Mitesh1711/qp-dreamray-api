const express = require('express');
const authCheck = require('./../middleware/authCheck');
const CommentModel = require('./../models/commentModel');

const router = express.Router();

router.get('', authCheck, (req, res, next) => {
    CommentModel.findAndCountAll({
        where: {recordId: req.query.id}
    }).then( result => {
        res.json(result);
    })
})

module.exports = router;