const express = require('express');
const { createGroup, getAllGroups } = require('../controllers/group');
const Router = express.Router();


Router.get('/all', (req,res,next)=>{console.log("passed from group all middleware"); next()},getAllGroups);
Router.post('/add-group', createGroup );

module.exports = {Router};