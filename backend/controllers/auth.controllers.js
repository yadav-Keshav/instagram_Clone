const User = require('../model/user');
const sendEmail = require('../utility/sendEmail');
const jwt = require('jsonwebtoken');
const createToken = require('../utility/createToken');
const {registerEmailTemplate,forgotEmailTemplate} =require('../utility/createToken');
const { createError } = require('../utility/createError');
exports.login = async (req, res, next) => {
    const { credential, password } = req.body;
    if (!credential || !password) {
        return next(createError(401, "Your username or password is not correct"));
    }

    User.findOne({ $or: [{ email: credential }, { userName: credential }] }, (err, user) => {
        if (!user) {
            return next(createError(401, "User not found."));
        }
        else {
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    return next(createError(401, "Wrong Credential"));
                }
                const token = jwt.sign({ id: user._id }, process.env.SECRET);
                return res.status(201).send({
                    message: "User Logged In", token, name: user.name, email: user.email, pic: user.pic, userName: user.userName
                })
            })
        }

    })
}



exports.register = async (req, res, next) => {
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
            User.create({ name, email, userName, password, token }, (err, user) => {
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
exports.verifyEmail = (req, res, next) => {
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
                    return next(createError(401, "Invalid token"));
                })
        }
        else {
            return next(createError(401, "Invalid token"));
        }
    })
}
exports.forgotPassword = (req, res, next) => {
    const email = req.body.email;
    const token = req.params.token;
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return next(createError(401, "User dont exists with that email"))
        }
        user.token = token
        user.expireToken = Date.now() + 3600000
        user.save().then((result) => {
            let link = `${req.protocol}://${req.get("host")}/users/forgot-password/${token}`;
            const Emailbody = forgotEmailTemplate(link);
            sendEmail(user.email, Emailbody);
            return res.json({ message: "check your email" })
        })

    })
}


exports.resetPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const sentToken = req.params.token;
    User.findOne({ token: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return next(createError(401, "User not found."));
            }
            user.resetToken = undefined
            user.expireToken = undefined
            user.save().then((saveduser) => {
                return res.json({ message: "password updated success" })
            })
        })
}
