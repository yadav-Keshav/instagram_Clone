const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Username cannot be Empty']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        require: [true, 'Username cannot be Empty'],
        validate: [isEmail, "Invalid Email"],
    },
    password: {
        type: String,
        minlength: [8, 'Password must be Greater than 8 letters'],
        required: [true, 'Password cannot be empty'],
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    userAvatar: {
        type: String,
        required: true,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=https%3A%2F%2Fexample.com%2Fimages%2Favatar.jpg"
    },
    numberOfPost: {
        type: Number,
        default: 0
    },
    numberOfFollowers: {
        type: Number,
        default: 0
    },
    numberOfFollowing: {
        type: Number,
        default: 0
    },
})
userSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        return next();
    })
})
userSchema.methods.comparePassword = function (password) {
    bcrypt.compare(password, this.password, (err, res) => {
        return res == true;
    })
}

module.exports =User= mongoose.model("User", userSchema);