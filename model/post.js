const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    postContent: {
        type: String,
        requires: [true, "post Content Should not be empty"]
    },
    postCategory: {
        type: String,
        enum: [1, 2],
    },
    postCreatedDate: {
        tyoe: Date,
        // default: Date.now(),
    },
    postCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    numberOfReactions: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose.model('Post', postSchema);