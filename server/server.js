const express = require("express");
require("./src/configs/mysql.config");
const app = express();
const port = 7000;
const cors = require("cors");
const {rootRouter} = require("./src/routers/root.router");
const bodyParser = require("body-parser");
// Set up
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Router
rootRouter(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});