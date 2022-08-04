const mongoose = require('mongoose');
const postReactionSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
exports.default = mongoose.model('postReaction', postReactionSchema);