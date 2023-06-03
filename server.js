let express = require('express');
let app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: "1mb"}));
app.use(express.json())

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
// const middle = require("./src/middleware/index");

//routes pruebas
app.get("/", (req, res)=> res.send("aqui miaara"));
// app.post("/upload", file.getDataUri)
app.post("/testimage", uploader.upload.single("file"), (req, res) => {
  res.send({data: "todo bien", pic: req.body, data: req.file})
})
app.get("/hasher", hasher.hashPassword);


//routes get

app.get("/user/:username", getUser.getUser)

//routes post
// app.post("/registeruser", uploader.upload.single("avatar"), userRegistration.checkUserData, userRegistration.saveUser);
app.post("/registeruser", uploader.upload.single("file"), userRegistration.checkUserData, userRegistration.saveUser);
app.post("/checkavailability", userCheck.checkUserData);
app.post("/loguser", loguser.logging)
