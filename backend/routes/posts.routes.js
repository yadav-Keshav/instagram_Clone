const express = require('express');
const {getSubPosts, createPost, myPost, likePost, unlikePost, comment, deletePost } = require('../controllers/post.controllers');
const { verifyToken } = require('../middleware/verifyToken');

const postRouter = express.Router();

postRouter.get("/subPosts", verifyToken, getSubPosts);     //Get post followed by 
postRouter.post("/create-post", verifyToken, createPost);
postRouter.get("/myPost", verifyToken, myPost);
postRouter.put("/like", verifyToken, likePost);
postRouter.put("/unlike", verifyToken, unlikePost);
postRouter.put("/comment", verifyToken, comment);
postRouter.delete("/deletePost/:postId", verifyToken, deletePost);

module.exports = postRouter;
