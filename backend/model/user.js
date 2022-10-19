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
        default: true
    },
    token: String,
    expireToken: Date,
    pic: {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxpbSUlfehDY3G43P41EoQsdg1OYN5Cye6d0rebs&s"
    },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }]
})

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});


userSchema.methods.comparePassword = function (candidatePassword,cb) {
    bcrypt.compare(candidatePassword, this.password, (err, res) => {
        if(err){
            return cb(err);
        }
        cb(null,res);
    })
};

module.exports = mongoose.model("User", userSchema);