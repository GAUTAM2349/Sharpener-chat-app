const express = require('express');
const { userSignup } = require('../controllers/user');
const Router = express.Router();

Router.post('/signup',(req,res,next)=>{console.log("came upto user signup router"); next()}, userSignup);

module.exports = {Router};