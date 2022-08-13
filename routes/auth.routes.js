const express=require('express');
const {login} = require('../controllers/auth.controllers');

const authRouter=express.Router();
authRouter.post("/login",login);

module.exports=authRouter;