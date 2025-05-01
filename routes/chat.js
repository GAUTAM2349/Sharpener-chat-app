const express = require('express');
const { addChat, getChats } = require('../controllers/chat');
const Router = express.Router();

Router.get('/:groupId', getChats);

Router.post('/', (req,res,next)=>{console.log("came upto Adding new chat router"); next()},addChat);

module.exports = {Router};
