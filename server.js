let express = require('express');
let app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: "1mb"}));

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
const middle = require("./src/middleware/index");
const file = require("./src/middleware/Cloudinary");

//routes pruebas
app.post("/", (req, res)=> res.send("aqui miaara"));
app.post("/upload", file.getDataUri)
app.get("/hasher", hasher.hashPassword);


//routes post
app.post("/registeruser", userRegistration.checkUserData, userRegistration.saveUser);
app.post("/checkavailability", userCheck.checkUserData);
app.post("/loguser", loguser.logging)

//routes get
app.get("/profile", middle.authHeader, middle.validSign)