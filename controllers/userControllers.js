const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const redisClient = new Redis();
const Users = require("../models/user");

//Register User Api
router.post("/signup", async (request, response) => {
  const { name, email, password, gender } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);
  const registerUser = {
    name: name,
    email: email,
    password: hashedPassword,
    gender: gender,
  };
  // console.log(registerUser);
  try {
    const checkEmail = await Users.find({ email: email });
    if (checkEmail.length === 0) {
      response.send(`User Registered Successfully With email: ${email}`);
      const newUser = new Users(registerUser);
      newUser.save();
    } else {
      response.send("Email Address You have Provided is  Already Exists");
    }
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

//User Login Api
router.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  try {
    const checkEmail = await Users.find({ email: email });
    if (checkEmail.length !== 0) {
      const verifyPassword = await bcrypt.compare(
        password,
        checkEmail[0].password
      );
      // console.log(verifyPassword);
      if (verifyPassword) {
        const playLoad = {
          email: email,
        };
        const jwtToken = jwt.sign(playLoad, "AccessToken", {
          expiresIn: "10m",
        });
        await redisClient.set("authorizationToken", jwtToken, "EX", 600);
        const refreshToken = jwt.sign(playLoad, "refreshToken");
        response.send({ jwtToken, refreshToken });
      } else {
        response.status(400);
        response.send("Invalid Password");
      }
    } else {
      response.status(400);
      response.send("Email Doesn't Exists");
    }
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

module.exports = router;
