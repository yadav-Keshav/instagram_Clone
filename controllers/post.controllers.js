const { get } = require('mongoose');
const { default: post } = require('../model/post');
const Post = require('../model/post');
const { uploadFile, getFileStream } = require('../utility/s3');

exports.createPost = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(200).json({ message: "Please upload your post image" });
    }
    const postCreatedBy = req.body.post_created_by;
    const postCreatedDate = new Date();
    const postCategory = req.file && req.file.mimetype.includes('image') ? 1 : 2;
    const postContent = req.file.location;
    post.create({ postContent, postCategory, postCreatedBy, postCreatedDate }, (err, post) => {
        if (err) {
            return res.status(200).json({ message: 'Cannot upload your post, please try again' });
        }
        else {
            return res.status(200).json({ message: 'Sucessfully uploaded' });
        }
    })
}
exports.getPosts = async (req, res) => {
    const { key } = req.body;
    const readStream = getFileStream(key);
    readStream.pipe(res);
}

exports.getPostById = async (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream(res);
}

exports.updateNumberOfReaction = (req, res) => {
    const { numberOfReactions, id } = req.body;
    Post.updateOne({ _id: id }, { numberOfReactions }, (err, post) => {
        if (err) {
            return res.status(200).json({ message: "The system error. Please try again" });
        }
        return res.status(200).json({ id, message: "Sucesfully updated" });
    })
}

exports.getPostByCategory = (req, res) => {
    const { userId, postCategory } = req.body;
    if (!userId || !postCategory) {
        res.status(200).jsonp({ message: 'Cannot load your posts, please try again' });
    }
    Post.find({ $and: [{ _id: userId }, { postCategory: postCategory }] }, (err, posts) => {
        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(200).json({ message: 'Cannot get your posts, please try again' });
        }
    })
}