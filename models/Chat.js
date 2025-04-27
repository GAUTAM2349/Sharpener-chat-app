const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Chat = sequelize.define("chat", {

    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });

module.exports = Chat;