const userFollowers = require('../model/userFollower');

exports.isFollowing = (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
        return res.status(200).jsonp({ message: 'Not found' });
    }
    userFollowers.findOne({ $and: [{ followerId }, { userId }] }, (err, response) => {
        if (response) {
            return res.status(200).json({ ...response });
        } else {
            return res.status(200).json({ message: 'Not found' });
        }
    })
}

exports.createFollowers = (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
        return res.status(200).json({ message: 'Cannot create the follower, please try again' });
    }
    userFollowers.create({ followerId, userId }, (err, result) => {
        if (err) {
            return res.status(200).json({ message: 'Cannot create the follower, please try again' });
        }
        else {
            return res.status(200).json({ message: 'Followers created' });
        }
    })
}

exports.deleteFollowers = (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
        res.status(200).json({ message: 'Cannot delete the follower, please try again' });
    }
    userFollowers.findOneAndRemove({ followerId, userId }, (err, result) => {
        if (err) {
            res.status(200).jsonp({ message: 'Cannot delete the follower, please try again' });
        } else {
            res.status(200).jsonp({ message: 'Follower removed' });
        }
    })
}