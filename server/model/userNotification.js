
const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    notificationMessage: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});
exports.default = mongoose.model('Notifications', postSchema);