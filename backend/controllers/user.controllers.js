const User = require('../model/user');
const Post = require('../model/post');
const { createError } = require('../utility/createError');

exports.getUserById = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            Post.find({ postedBy: req.params.id }).select("-password")
                .populate("postedBy", "_id name")
                .exec((err, posts) => {
                    if (err) {
                        return next(createError(401, err.message));
                    }
                    return res.status(200).json({ user, posts })
                })
        }).catch(err => {
            return next(createError(404, "User not found"));
        })
}

exports.follow = (req, res, next) => {
    User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.user._id } }, { new: true }, (err, result) => {
        if (err) {
            return next(createError(401, err.message));
        }
        User.findByIdAndUpdate(req.user._id, { $push: { following: req.body.followId } }, { new: true }).select("-password").then(result => {
            return res.status(200).json(result)
        }).catch(err => {
            return next(createError(401, err.message));
        })

    }
    )
}

exports.unfollow = (req, res, next) => {
    User.findByIdAndUpdate(req.body.unfollowId, { $pull: { followers: req.user._id } }, { new: true }, (err, result) => {
        if (err) {
            return next(createError(401, err.message));
        }
        User.findByIdAndUpdate(req.user._id, { $pull: { following: req.body.unfollowId } }, { new: true }).select("-password").then(result => {
           return res.status(200).json(result)
        }).catch(err => {
            return next(createError(401, err.message));
        })

    }
    )
}

exports.updatepic = (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: { pic: req.body.pic } }, { new: true },
        (err, result) => {
            if (err) {
                return next(createError(401, "pic canot post"));
            }
           return res.status(200).json(result);
        })
}

exports.searchUser = (req, res, next) => {
    let userPattern = new RegExp("^" + req.body.query)
    User.find({ email: { $regex: userPattern } })
        .select("_id email")
        .then(user => {
           return res.status(200).json({ user })
        }).catch(err => {
            return next(createError(401, err.message));
        })
}

