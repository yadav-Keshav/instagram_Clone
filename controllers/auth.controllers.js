const jwt = require('jsonwebtoken');
const User = require('../model/user');
const {createError} =require('../utility/createError');
exports.login =async(req, res,next) => {
    const { credential, password } = req.body;
    if (!credential || !password) {
        return next(createError(401, "Your username or password is not correct"));
    }

    User.findOne({ $or: [{ email: credential }, { userName: credential }] }, (err, user) => {
        if (!user) {
            return next(createError(401, "User not found."));
        }
        else {
            if (user.comparePassword(password) && user.verified) {
                const token = jwt.sign({ id: user._id }, process.env.SECRET);
                res.cookie('token', token, { httpOnly: true });
                return res.status(201).send({
                    message: "User Logged In", token, name: user.name,
                })
            }
            else {
                return next(createError(401, "Wrong Credential"));
            }
        }

    })
}

