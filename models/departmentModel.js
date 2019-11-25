const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');

const Department = sequelize.define('departments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: false

});

module.exports = Department;