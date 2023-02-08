require("../../config/db");
const bcrypt = require('bcrypt');
const User = require("../../models/user.model");

module.exports.checkUserData = async function (req, res, next) {
  const { username, email } = req.body;

  try {
    let errors = {};
    let checkUserExist = await User.findOne({ username });
    let checkEmailExist = await User.findOne({ email });

    if (checkEmailExist) {
      errors.email = "Email address already exists.";
    }

    if (checkUserExist) {
      errors.username = "Username already exists.";
    }

    if (Object.keys(errors).length !== 0) {
      console.log("Error found in email or username or both");
      res.status(500).send({
        errors: errors,
        succesful: false,
      });
    } else {

      next();

    }
  } catch (err) {
    
    res.send({
      error: err,
      msg: "Error in connection",
      succesful: false,
    });
    console.log("Error in connection");
  }

};


module.exports.saveUser = async function (req, res) {

  const { username, email, password } = req.body;

  let hassPass = await bcrypt.hash(password, 10);

  const user = new User({
    username: username,
    email: email,
    password: hassPass,
  });

  await user
    .save()
    .then((result) => {
      res.send({
        msg: "User succesfully registered",
        succesful: true
      });
      console.log("User Registered");
    })
    .catch((err) => {
      res.send({
        error: err,
        msg: "Error in server",
        succesful: false
      });
      console.log("Error : " + err);
    });
};



module.exports.validDataUser = async function (req, res, next) {
  const { username, email, password } = req.body;

  // username regex explanation https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username

  let regUsername = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/gm; // regular expression only letters
                  // └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
                  // │         │         │            │           no _ or . at the end
                  // │         │         │            │
                  // │         │         │            allowed characters
                  // │         │         │
                  // │         │         no __ or _. or ._ or .. inside
                  // │         │
                  // │         no _ or . at the beginning
                  // │
                  // username is 4-20 characters long
  let regEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/gm;



}