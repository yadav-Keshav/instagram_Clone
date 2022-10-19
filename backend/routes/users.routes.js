const express = require('express');
const { searchUser, getUserById, follow, unfollow, updatepic } = require('../controllers/user.controllers');
const { verifyToken } = require('../middleware/verifyToken')

const userRouter = express.Router();
userRouter.get("/:id", verifyToken, getUserById);        //get user by id
userRouter.get("/getFollower/:id")
userRouter.put("/follow/:id", verifyToken, follow);      //follow user
userRouter.put("/unfollow/:id", verifyToken, unfollow);  //unfollow user
userRouter.put("/updatepic", verifyToken, updatepic);     //update profile pic
userRouter.get("/search-users", verifyToken, searchUser);//serach user by name



module.exports = userRouter;