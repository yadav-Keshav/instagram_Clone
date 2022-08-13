const express = require('express');
const login = require('../controllers/auth.controllers');
const { updateNumberOfFollowers, updateNumberOfPosts, getUserById, register, verifyEmail } = require('../controllers/user.controllers');
const {verifyToken} =require('../middleware/verifyToken')

const userRouter = express.Router();
userRouter.post("/create", register);
userRouter.post("/followers/:id", updateNumberOfFollowers);
userRouter.post("/posts",verifyToken, updateNumberOfPosts);
userRouter.get("/confirm_email/:token", verifyEmail);
userRouter.get("/:id", getUserById);

module.exports = userRouter;