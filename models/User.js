const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true,
    },
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]{10}$/  
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  timestamps: false,  
});



module.exports = User;
