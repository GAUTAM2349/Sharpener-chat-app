const express = require('express');
const { createGroup, getAllGroups, getAllMembersOfAGroup, addGroupAdmin, deleteGroupMember } = require('../controllers/group');
const Router = express.Router();


Router.get('/all', (req,res,next)=>{console.log("passed from group all middleware"); next()},getAllGroups);
Router.get('/group-members/:groupId', getAllMembersOfAGroup);
Router.post('/add-group', createGroup );
Router.post('/add-admin/:groupId/:adminUserId',addGroupAdmin);
Router.delete('/delete-member/:groupId/:memberUserId', deleteGroupMember);


module.exports = {Router};