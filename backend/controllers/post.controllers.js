const Post = require('../model/post');
const createError = require('../utility/createError');
exports.allPosts = (req, res, next) => {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort('-createdAt')
        .then((posts) => {
            return res.status(200).json({ posts })
        }).catch(err => {
            return next(createError(401, err.message));
        })
}

exports.getSubPosts = (req, res, next) => {
    // if postedBy in following
    Post.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort('-createdAt')
        .then(posts => {
            res.status(200).json({ posts })
        })
        .catch(err => {
            return next(createError(401, err.message));
        })
}

exports.createPost = (req, res, next) => {
    const { title, body, pic } = req.body
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Plase add all the fields" })
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then(result => {
        res.status(200).json({ post: result })
    })
        .catch(err => {
            return next(createError(401, err.message));
        })
}

exports.myPost = (req, res, next) => {
    Post.find({ postedBy: req.user._id })
        .populate("PostedBy", "_id name")
        .then(mypost => {
            res.status(200).json({ mypost })
        })
        .catch(err => {
            return next(createError(401, err.message));
        })
}

exports.likePost = (req, res, next) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return next(createError(401, err.message));
        } else {
            res.status(200).json(result)
        }
    })
}

exports.unlikePost = (req, res, next) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return next(createError(401, err.message));
        } else {
            res.status(200).json(result)
        }
    })
}

exports.comment = (req, res, next) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return next(createError(401, err.message));
            } else {
                res.status(200).json(result)
            }
        })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.status(200).json(result)
                    }).catch(err => {
                        return next(createError(401, err.message));
                    })
            }
        })
}