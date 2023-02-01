let express = require('express');
let app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: "1mb"}));

module.exports = app;

// routes
const userRegistration = require("./src/routes/userRegistration");

app.get("/", (req, res)=> res.send("aqui mira").json());

app.post("/registeruser", userRegistration.checkUserData, userRegistration.saveUser);