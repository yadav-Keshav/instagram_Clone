const multer = require('multer')
const express = require('express');
const { createPost, getPosts, getPostById } = require('../controllers/post.controllers');
const { uploadfile } = require('../utility/s3');
const postRouter = express.Router();

postRouter.post("/create",  uploadfile,createPost);
postRouter.get("/", getPosts);
postRouter.get("/post/:id", getPostById);

module.exports = postRouter;
