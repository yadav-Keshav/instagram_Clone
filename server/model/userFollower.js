const mongoose = require('mongoose');
const userFollowerSchema = new mongoose.Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});
exports.default = mongoose.model('userFollowers', userFollowerSchema);