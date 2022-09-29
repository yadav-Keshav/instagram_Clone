const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    token: String,
    expireToken: Date,
    pic: {
        type: String,
        default: "https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png"
    },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }]
})

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});
userSchema.methods.comparePassword = async function (password) {
    bcrypt.compare(password, this.password, (err, res) => {
        return res;
    })
};

module.exports = mongoose.model("User", userSchema);