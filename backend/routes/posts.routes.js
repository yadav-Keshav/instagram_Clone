const express = require('express');
const { allPosts, getSubPosts, createPost, myPost, likePost, unlikePost, comment, deletePost } = require('../controllers/post.controllers');
const { verifyToken } = require('../middleware/verifyToken');

const postRouter = express.Router();

postRouter.get("/allPost", verifyToken, allPosts);
postRouter.get("/subPosts", verifyToken, getSubPosts);
postRouter.post("/createPost", verifyToken, createPost);
postRouter.get("/myPost", verifyToken, myPost);
postRouter.put("/like", verifyToken, likePost);
postRouter.put("/unlike", verifyToken, unlikePost);
postRouter.put("/comment", verifyToken, comment);
postRouter.delete("/deletePost/:postId", verifyToken, deletePost);

module.exports = postRouter;
