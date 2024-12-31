const express = require("express");
const route = require("./routes/client/index.route.js");
require("dotenv").config();
// port mặc định là 3000
const app = express();
const port = process.env.PORT;
// add pug
app.set("views", "./views");
app.set("view engine", "pug");

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
