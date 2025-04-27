const express = require('express');
const { addChat, getChats } = require('../controllers/chat');
const Router = express.Router();

Router.get('/:id', getChats);

Router.post('/:id', (req,res,next)=>{console.log("came upto Adding new chat router"); next()},addChat);

module.exports = {Router};
