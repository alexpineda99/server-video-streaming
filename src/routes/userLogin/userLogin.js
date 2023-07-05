require("../../config/db");
const jwt = require("jsonwebtoken");
const token = require("../../middleware/token");
const User = require("../../models/user.model");

module.exports.logging = async function (req, res, next) {
  const { _SIGN } = process.env;

  const { username_email, password } = req.body;
  const userWithEmailorUsername = await User.find({
    $or: [{ username: username_email }, { email: username_email }],
  }).catch((err) => {
    console.log("Error: ", err);
    res.status(400).send({
      err: err,
      successful: false,
    });
  });

  if (!userWithEmailorUsername.length)
    return res.status(400).send("Email, username or password do not match.");

  if (userWithEmailorUsername[0].password !== password)
    return res.status(400).send("Email, username or password do not match.");

  // let user = jwt.sign({user: userWithEmailorUsername[0].username}, _SIGN, {algorithm: "HS256", expiresIn: "1d"})

  let accessToken = token.userAccesToken(userWithEmailorUsername[0].username);
  let refreshToken = token.userRefreshToken(
    userWithEmailorUsername[0].username
  );

  res.cookie("user_access", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.send({
    accessToken: accessToken,
    successful: true
  });

};
