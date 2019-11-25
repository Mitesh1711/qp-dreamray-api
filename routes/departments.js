const express = require('express');
const authCheck = require('./../middleware/authCheck');
const DepartmentModel = require('./../models/departmentModel');
const router = express.Router();

router.get('', authCheck, (req, res, next) => {
    DepartmentModel.findAll()
    .then(result => {
        res.json(result);
    })
});

module.exports = router;