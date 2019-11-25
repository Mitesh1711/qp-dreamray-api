//User Model
const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    depId: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    biography: {
        type: Sequelize.TEXT
    },
    lastLogged: {
        type: Sequelize.DATE
    },
    password_hash: {
        type: Sequelize.STRING
    },
    activationStatus: {
        type: Sequelize.STRING
    },
    points: {
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = User;