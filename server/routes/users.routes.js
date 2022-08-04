const express = require('express');
const login = require('../controllers/auth.controllers');
const { updateNumberOfFollowers, updateNumberOfPosts, getUserById, register } = require('../controllers/user.controllers');


const userRouter = express.Router();
userRouter.post("/create", register);
userRouter.post("/followers", updateNumberOfFollowers);
userRouter.post("/posts", updateNumberOfPosts);
userRouter.get("/:id", getUserById);

module.exports = userRouter;