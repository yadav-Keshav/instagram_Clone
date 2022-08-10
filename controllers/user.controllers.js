
const User = require('../model/user');
const registerEmailTemplate = require('../utility/registerEmailTemplate');
const sendEmail = require('../utility/sendEmail');


exports.register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(200).json({ message: "Please input required fields" });
    }
    User.findOne({ email }, (err, user) => {
        if (user) {
            return res.status(200).json({ message: 'The email exist' });
        }
        else {
            User.create({ name, email, password }, (err, user) => {
                if (user) {
                    let link = `${req.protocol}://${req.get("host")}/users/confirm_email`;
                    const Emailbody = registerEmailTemplate(user.name, link);
                    sendEmail(user.email, Emailbody);
                    return res.status(200).json({ message: "Sucessfully Created" });
                }
                else {
                    return res.status(200).json({ message: err.message });
                }
            })
        }
    })
}

exports.updateNumberOfFollowers = (req, res) => {
    const { numberOfFollowers, id } = req.body;
    User.updateOne({ _id: id }, { numberOfFollowers: numberOfFollowers }, (err, updatedUser) => {
        if (err) {
            return res.status(200).json({ message: "The system error. Please try again" });
        }
        return res.status(200).json({ id });
    })
}

exports.updateNumberOfPosts = (req, res) => {
    const { numberOfPosts, id } = req.body;
    User.updateOne({ _id: id }, { numberOfPosts: numberOfPosts }, (err, updatedUser) => {
        if (err) {
            return res.status(200).json({ message: "The system error. Please try again" });
        }
        return res.status(200).json({ id });
    })
}

exports.getUserById = (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(200).json({ message: 'Cannot load user information, please try again' });
    }
    User.findOne({ _id: userId }, (user, err) => {
        if (err) {
            return res.status(200).json({ message: 'Cannot load user information, please try again' });
        }
        return res.status(200).jsonp(...user, password = NULL);
    })
}

