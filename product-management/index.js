const express = require("express");
const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");
const database = require("./config/database");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
// add pug
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

database.connect();
routeAdmin(app);
routeClient(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
