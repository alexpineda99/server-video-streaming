const mongoose = require('mongoose');

// mongodb://localhost:27017
const {MONGODB_HOST, MONGODB_DATABASE} = process.env;

const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI)
.then(db=> console.log("Db connected"))
.catch(err=> console.log("Error en database"))