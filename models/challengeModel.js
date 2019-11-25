//Challenge Model
const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');

const Challenge = sequelize.define('challenges', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    responses: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING
    },
    phase: {
        type: Sequelize.STRING
    },
    date_completed: {
        type: Sequelize.DATE
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = Challenge;