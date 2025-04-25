const express = require('express');
const { userSignup, userLogin } = require('../controllers/user');
const Router = express.Router();

Router.post('/signup',(req,res,next)=>{console.log("came upto user signup router"); next()}, userSignup);
Router.post('/login',(req,res,next)=>{console.log("came upto user login router"); next()}, userLogin);

module.exports = {Router};