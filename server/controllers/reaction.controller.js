const postReaction = require('../model/postReaction');

exports.checkReaction = (req, res) => {
    const { post_id, user_id } = req.body;
    if (!post_id || !user_id) {
        return res.status(200).jsonp({ message: 'Not found' });
    }
    postReaction.findOne({ post_id, user_id }, (err, reaction) => {
        if (err) {
            return res.status(200).jsonp({ message: 'Not found' });
        }
        else {
            return res.status(200).jsonp({ ...response });
        }
    })
}

exports.createReaction = (req, res) => {
    const { postId, userId } = req.body;
    if (!postId || !userId) {
        res.status(200).jsonp({ message: 'Cannot create the post reaction, please try again' });
    }
    postReaction.create({ postId, userId }, (err, reaction) => {
        if (err) {
            return res.status(200).json({ message: 'Cannot create the post reaction, please try again' });
        }
        else {
            return res.status(200).json({ insertId: insertedReaction.insertId, post_id: postId, user_id: userId });
        }
    })
}

exports.deleteReaction = (req, res) => {
    const { postId, userId } = req.body;
    if (!postId || !userId) {
        res.status(200).jsonp({ message: 'Cannot create the post reaction, please try again' });
    }
    postReaction.findOneAndRemove({postId,userId},(err,reaction)=>{
        if(err){
            return res.status(200).json({ message: 'Cannot delete the post reaction, please try again' });
        }
        else{
            return res.status(200).json({ postId, userId });
        }
    })
}