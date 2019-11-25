//Record model
const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');

const Record = sequelize.define('records', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    depId: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    benefits: {
        type: Sequelize.STRING
    },
    phase: {
        type: Sequelize.STRING
    },
    permission: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = Record;