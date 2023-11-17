const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const redisClient = new Redis();

const verifyAccessToken = async (request, response, next) => {
  let jwtToken = await redisClient.get("authorizationToken");

  console.log(jwtToken);
  if (jwtToken === null) {
    response.status(401);
    response.send("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "AccessToken", async (error, playLoad) => {
      if (error) {
        response.status(401);
        response.send("Invalid Access Token");
      } else {
        next();
      }
    });
  }
};

router.post("/add", verifyAccessToken, studentController.createStudent);
router.get("/allStudents", verifyAccessToken, studentController.getStudent);
router.get("/student/:id", verifyAccessToken, studentController.singleStudent);
router.put("/update/:id", verifyAccessToken, studentController.updateStudent);
router.delete(
  "/delete/:id",
  verifyAccessToken,
  studentController.deleteStudent
);
module.exports = router;
