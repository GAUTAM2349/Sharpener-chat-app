const express = require('express');
const Router = express.Router();
const { userSignup, userLogin, getAllUsers, userLoginStatus } = require('../controllers/user');
const loggedinUsersOnly = require('../middlewares/loggedinUsersOnly');

Router.get('/', getAllUsers);
Router.get('/login-status',loggedinUsersOnly, userLoginStatus);
Router.post('/signup',(req,res,next)=>{console.log("came upto user signup router"); next()}, userSignup);
Router.post('/login',(req,res,next)=>{console.log("came upto user login router"); next()}, userLogin);

module.exports = {Router};  