const jwt = require('jsonwebtoken');
const User = require('../model/user');
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(200).json({ message: "Your username or password is not correct" });
    }
    User.findOne(email, (err, user) => {
        if (user == NULL) {
            return res.status(400).send({ message: "User not found." });
        }
        else {
            if (user.comparePassword(password)) {
                const token = jwt.sign({ id: user._id }, secret);
                return res.status(201).send({
                    message: "User Logged In", token, name: user.name
                })
            }
            else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }

    })
}

module.exports = login;