const jwt = require("jsonwebtoken")
const User = require("../../models/user.model");

module.exports.unfollowUser = async function (req, res) {

    try {
        const {_SIGN} = process.env;
        const userToken = req.headers.auth;
        const currentUser = await User.findOne({username: `${jwt.decode(userToken, _SIGN).user}`});
        const userTofollow = await User.findOne({username: `${req.params.username}`});
        let checkFollowing = currentUser.following.filter(CUser => CUser.username = userTofollow.username)

        if (!currentUser || !userTofollow) {
            return res.status(404).json({message: "User not found"});
        }  

        if (checkFollowing.length === 0) {
            return res.status(404).json({message: "Already unfollowing this user"});
        }

        let addFollowingToCurrentUser = await User.findOne({username: currentUser.username})
        await User.updateOne({username: currentUser.username}, {$pull: {following: {userId: userTofollow._id, username: userTofollow.username}}})
        await addFollowingToCurrentUser.save()

        let addFollowersToOtherUser = await User.findOne({username: userTofollow.username})
        await User.updateOne({username: userTofollow.username}, {$pull: {followers: {userId: currentUser._id, username: currentUser.username}}})
        await addFollowersToOtherUser.save()

        res.send({
            msg: "User unfollowed",
            successful: true
        })

    } catch(err) {

        console.log("error en unfollowing")
        res.send({
            msg: err,
            successful: false
        })

    }

}