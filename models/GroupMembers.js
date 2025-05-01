const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GroupMembers = sequelize.define('group_members', {

},{
    timestamps : false
});

module.exports =  GroupMembers;

