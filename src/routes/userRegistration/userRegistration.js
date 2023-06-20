require("../../config/db");
const bcrypt = require("bcrypt");
const DatauriParser = require("datauri/parser");
const cloudinary = require("../../config/cloudinary_conf");
const path = require("path");
const User = require("../../models/user.model");
const { error } = require("console");

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

  const parser = new DatauriParser();

  const extName = path.extname(req.file.originalname).toString();
  const file64 = parser.format(extName, req.file.buffer);
  


    let hassPass = await bcrypt.hash(password, 10);
    cloudinary.uploader.upload(file64.content, {folder: "Avatar"}, async (error, result) => {

      try {

        if (error) {
          console.log("Muestra error aqui: " + error)
        }

      const user = new User({

        username: username,
        email: email,
        password: hassPass,
        avatar: {public_id: result.public_id, url: result.secure_url}

      }).save()


    } catch(error) {

      console.log(error)

    }

    })
    // let userAvatar = await cloudinary.uploader.upload(file64.content, {folder: "Avatar"});
    
  
  //   const user = new User({
  //     username: username,
  //     email: email,
  //     password: hassPass,
  //     avatar: {public_id: userAvatar.public_id, url: userAvatar.secure_url}
  //   })
  
  // await user.save();


  // await user
  //   .save()
  //   .then((result) => {
  //     res.send({
  //       msg: "User succesfully registered",
  //       succesful: true
  //     });
  //     console.log("User Registered");
  //   })
  //   .catch((err) => {
      
  //     res.send({
  //       error: err,
  //       msg: "Error in server",
  //       succesful: false
  //     });
  //     console.log("Error : " + err);
  //   });
};

// username regex explanation https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username

// let regUsername = /^(?=.{3,20}$)(?![])?!.*[_.-]{2})[a-zA-Z0-9._-]+(?<![])$/gm; // regular expression only letters
                    // └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
                          // │         │         │            │           _ or .  or - at the end
                          // │         │         │            │
                          // │         │         │            allowed characters
                          // │         │         │
                          // │         │         no __ or _. or ._ or .. inside
                          // │         │
                          // │          _ or . at the beginning but not continued
                          // │
                          // username is 4-20 characters long
