const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');

const Notification = sequelize.define('notifications', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    toUserId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fromUserId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    depId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    importance: {
        type: Sequelize.STRING,
        allowNull: false
    },
    seen: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }

})

module.exports = Notification;