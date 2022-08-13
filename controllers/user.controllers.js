
const User = require('../model/user');
const registerEmailTemplate = require('../utility/registerEmailTemplate');
const sendEmail = require('../utility/sendEmail');
const jwt = require('jsonwebtoken');
const createToken = require('../utility/createToken');
const {createError}=require('../utility/createError');

exports.register = async (req, res,next) => {
    const { email, userName, password, name } = req.body;
    if (!email || !password || !name || !userName) {
        return next(createError(401, "Please input required fields"));

    }
    User.findOne({ $or: [{ email }, { userName }] }, (err, user) => {
        if (user) {
            return next(createError(401, 'User already register'));
        }
        else {
            const token = createToken();
            User.create({ name, email,userName, password, token }, (err, user) => {
                if (user) {
                    let link = `${req.protocol}://${req.get("host")}/users/confirm_email/${token}`;
                    const Emailbody = registerEmailTemplate(user.name, link);
                    sendEmail(user.email, Emailbody);
                    return res.status(200).json({ message: "Sucessfully Created" });
                }
                else {
                    return next(createError(401, err.message));
                }
            })
        }
    })
}
exports.verifyEmail = (req, res,next) => {
    const token = req.params.token;
    if (!token) {
        return next(createError(401, "Invalid token"));
    }
    User.findOne({ token }, (err, user) => {
        if (user) {
            user.vefified = true;
            user.token = undefined;
            user.save()
                .then(() => {
                    return res.status(200).json({ message: "Sucessfully verified" });
                })
                .catch(err => {
                    return next(createError(401, "Invalid token" ));
                })
        }
        else {
            return next(createError(401, "Invalid token"));
        }
    })
}
exports.updateNumberOfFollowers = (req, res,next) => {
    const { numberOfFollowers} = req.body;
    const id=req.params.id;
    User.updateOne({ _id: id }, { numberOfFollowers: numberOfFollowers }, (err, updatedUser) => {
        if (err) {
            return next(createError(401, "The system error. Please try again"));
        }
        return res.status(200).json({ id });
    })
}

exports.updateNumberOfPosts = (req, res,next) => {
    const { numberOfPosts, id } = req.body;
    User.updateOne({ _id: id }, { numberOfPosts: numberOfPosts }, (err, updatedUser) => {
        if (err) {
            return next(createError(401, "The system error. Please try again"));
        }
        return res.status(200).json({ id });
    })
}

exports.getUserById = (req, res,next) => {
    const userId = req.params.id;
    if (!userId) {
        return next(createError(401, 'Cannot load user information, please try again'));
    }
    User.findOne({ _id: userId }, (user, err) => {
        if (err) {
            return next(createError(401,'Cannot load user information, please try again'));
        }
        return res.status(200).jsonp(...user, password = NULL);
    })
}

