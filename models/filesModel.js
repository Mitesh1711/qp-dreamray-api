const Sequelize = require('sequelize');
const sequelize = require('../dbconnection');

const Files = sequelize.define('records', {
    file_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    record_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Files;