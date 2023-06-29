const user = require("../../models/user.model");
const jwt = require("jsonwebtoken")

module.exports.getUserInfo = async function (req, res) {
  const userToken = req.headers.auth;
  const {_SIGN} = process.env;

  try {
    let currentUser = jwt.decode(userToken, _SIGN).user;
    let result = await user.find({ username: currentUser });

    res.send({
      infoUser: {
        username: result[0].username,
        email: result[0].email,
        avatar: result[0].avatar.url,
        followers: result[0].followers,
        following: result[0].following,
      },
    });

  } catch (err) {
    res.status(404).send("Error " + err);
  }
};
