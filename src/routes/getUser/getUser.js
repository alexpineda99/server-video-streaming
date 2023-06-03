const user = require("../../models/user.model");

module.exports.getUser = async function (req, res) {


  let username = req.params.username;

  try {

  let result = await user.find({ username: username });

  res.send({
    // result
    username: result[0].username,
    email: result[0].email,
    avatar: result[0].avatar.url,
  });
} catch (err) {
    res.send("Error " + err)
}
};
