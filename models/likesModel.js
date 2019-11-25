const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');

const Likes = sequelize.define('record_likes', {
    recordId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Likes;