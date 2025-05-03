const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GroupMembers = sequelize.define('group_members', {
  role: {
    type: DataTypes.ENUM('member', 'admin','owner'),
    defaultValue: 'member',
    allowNull: false,
  }
}, {
  timestamps: false,
});

module.exports = GroupMembers;
