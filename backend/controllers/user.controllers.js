const User = require('../model/user');
const Post = require('../model/post');
const { createError } = require('../utility/createError');

exports.getUserById = (req, res, next) => {

    User.findById(req.user._id, (err, result) => {
        if (err) {
            return next(createError(401, err.message));
        }
        const { name, followers, following, pic } = result;
        return res.status(200).json({ name, pic, noOfFollowers: followers.length, noOfFollowing: following.length });
    })
}

exports.follow = (req, res, next) => {
    const id = req.params.id;
    const following = req.user.following;
    if (following.includes(id)) {
        return next(createError(401, "Already following"))
    }
    User.findByIdAndUpdate(req.user._id, { $push: { following: id } }, { new: true }, (err, result) => {
        if (err) {
            return next(createError(401, err.message));
        }
    })
    User.findByIdAndUpdate(id, { $push: { followers: req.user._id } }, { new: true }, (err, result) => {
        if (err) {
            return next(createError(401, err.message));
        }
        return res.status(200).json({ message: "Sucessful" })
    })
}

exports.unfollow = (req, res, next) => {
    const id = req.params.id;
    const following = req.user.following;
    if (!following.includes(id)) {
        return next(createError(401, "You are not following"))
    }
    User.findByIdAndUpdate(req.user._id, { $pop: { following: id } }, { new: true }, (err, result) => {
        if (err) {
            return next(createError(401, err.message));
        }
    })
    User.findByIdAndUpdate(id, { $pop: { followers: req.user._id } }, { new: true }, (err, result) => {
        if (err) {
            return next(createError(401, err.message));
        }
        return res.status(200).json({ message: "Sucessful" })
    })
}

exports.updatepic = (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: { pic: req.body.pic } }, { new: true },
        (err, result) => {
            if (err) {
                return next(createError(401, "pic canot post"));
            }
            return res.status(200).json({ message: "sucesfully updated" });
        })
}

exports.getFollower = (req, res, next) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) return next(createError(401, "You are not following"))
    })
    User.find({ _id:})
}

exports.getFollowing = (req, res, next) => {

}
exports.searchUser = (req, res, next) => {
    let userPattern = new RegExp("^" + req.query.name)
    console.log(userPattern)
    User.find({ name: { $regex: userPattern } })
        .select("_id email name pic")
        .then(user => {
            return res.status(200).json({ user })
        }).catch(err => {
            return next(createError(401, err.message));
        })
}

