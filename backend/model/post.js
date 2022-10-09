const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" }
    }],
    postedBy: {
        id: {
            type: ObjectId,
            ref: "User"
        },
        name: {
            type: String
        },


    }
}, { timestamps: true })

module.exports = mongoose.model("Post", postSchema);