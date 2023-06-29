let express = require('express');
const cookieparser = require('cookie-parser');
let app = express();
app.use(cookieparser());
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: "1mb"}));
app.use(express.json());


module.exports = app;

app.all('*', function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, auth, authad, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// routes
const userRegistration = require("./src/routes/userRegistration");
const userCheck = require("./src/routes/userRegistration");
const loguser = require("./src/routes/userLogin");
const hasher = require("./src/config/hashPass.model");
const uploader = require("./src/middleware/multer")
const getUser = require("./src/routes/getUser");
const userFollow = require("./src/routes/userFollow");
const userUnfollow = require("./src/routes/userUnfollow");
const userProfile = require("./src/routes/UserProfile");
const middle = require("./src/middleware/token");

//routes pruebas
app.get("/", (req, res)=> res.send("aqui miaara"));
app.get("/profile", userProfile.getUserInfo)
app.post("/testimage", uploader.upload.single("file"), (req, res) => {
  res.send({data: "todo bien", pic: req.body, data: req.file})
})
app.get("/verify", hasher.hashPassword, middle.refreshToken)
app.get("/hasher", hasher.hashPassword);


//routes get
app.get("/user/:username", getUser.getUser)
app.get("/follow/:username", userFollow.followUser)
app.get("/unfollow/:username", userUnfollow.unfollowUser)

//routes post
app.post("/checkavailability", userCheck.checkUserData);
app.post("/loguser", loguser.logging)
