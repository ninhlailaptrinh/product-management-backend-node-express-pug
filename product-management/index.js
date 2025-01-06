const express = require("express");
const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");
const database = require("./config/database");
const systemConfig = require("./config/system");
var bodyParser = require("body-parser");
// Cấu hình port và mongodb
require("dotenv").config();

// Cấu hình method
var methodOverride = require("method-override");

// call port
const app = express();
const port = process.env.PORT;

// add pug
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

//App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(methodOverride("_method"));

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// connect
database.connect();
routeAdmin(app);
routeClient(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
