const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentRoute = require("./routes/studentRoute");
const router = require("./controllers/userControllers");
// const test = require("./test/api.test");
// const studentController=require("./controllers/studentController");
const app = express();

const PORT = process.env.PORT || 3000;

dotEnv.config();

app.use(bodyParser.json());
const dbConnection = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(`${error}`);
  });

app.use("/students", studentRoute);
app.use("/", router);
app.listen(PORT, () => {
  console.log("server running at ", PORT);
});

module.exports = { dbConnection, app };
