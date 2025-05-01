const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');



const Group = sequelize.define('groups', {

    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    
},
{
    timestamps : false
})

module.exports =  Group;