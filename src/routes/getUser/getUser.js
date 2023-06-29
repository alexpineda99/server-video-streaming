const user = require("../../models/user.model");
const jwt = require("jsonwebtoken")

module.exports.getUser = async function (req, res) {
  let username = req.params.username;
  const userToken = req.headers.auth;
  const {_SIGN} = process.env;

  try {
    let result = await user.find({ username: username });
    let currentUser = jwt.decode(userToken, _SIGN).user;

    if (username === currentUser) {
      return res.send({sameUser: true})
    }

    res.send({
      infoUser: {
        username: result[0].username,
        email: result[0].email,
        avatar: result[0].avatar.url,
        followers: result[0].followers,
        following: result[0].following,
      },
      currentUser: currentUser
    });

  } catch (err) {
    res.status(404).send("Error " + err);
  }
};
