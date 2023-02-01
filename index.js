require("dotenv").config()
require("./src/config/db");

const app = require("./server");
PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listenning on port ${PORT}`));