const Sequelize = require('sequelize');
const sequelize = require('./../dbconnection');

const Appraisal = sequelize.define( 'appraisals', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sender_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    receiver_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    justification: {
        type: Sequelize.STRING,
        allowNull: false
    },
    super: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = Appraisal;