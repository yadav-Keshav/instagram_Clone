const express = require('express');
const { searchUser, getUserById, follow, unfollow, updatepic } = require('../controllers/user.controllers');
const { verifyToken } = require('../middleware/verifyToken')

const userRouter = express.Router();
userRouter.get("/:id", verifyToken, getUserById);
userRouter.put("/follow", verifyToken, follow);
userRouter.put("/unfollow", verifyToken, unfollow);
userRouter.put("updatepic", verifyToken, updatepic);
userRouter.get("/search-users", verifyToken, searchUser);



module.exports = userRouter;