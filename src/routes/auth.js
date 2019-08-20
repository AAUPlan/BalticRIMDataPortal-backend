"use strict";
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { queries } = require("../database/queries");
const { hashFunctions } = require("../hashing/hashandsalt");
const { registerValidation, loginValidation } = require("../validation");

//REGISTERING USER
router.post("/register", async (req, res) => {
  if (
    req.body.name &&
    req.body.username &&
    req.body.email &&
    req.body.password
  ) {
    const passwordsecrets = hashFunctions.saltandhash(req.body.password);

    //validating input
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    //Check if provided email already exist in database
    const emailExist = queries.readUser(req.body.email);
    if (
      !Object.entries(emailExist).length === 0 &&
      emailExist.constructor === Object
    ) {
      return res
        .status(400)
        .send({ msg: emailExist })
        .end();
    } else {
      const userDetails = {
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        hashedpassword: passwordsecrets.hash,
        salt: passwordsecrets.salt,
      };

      try {
        //const newUser = await queries.addUser(client, userDetails);
        const addAttempt = await queries.addUser(userDetails);
        res
          .status(addAttempt.code)
          .send(addAttempt)
          .end();
      } catch (err) {
        res
          .status(400)
          .send({ msg: "Could not add user" })
          .end();
      }
    }
  }
});

// USED FOR LOGIN
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });

  const userDetails = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const loginAttempt = await queries.readUser(userDetails.email);
    const loggedIn = hashFunctions.validateLogin(
      userDetails.password,
      loginAttempt
    );

    if (loggedIn) {
      //create and assign token

      const token = jwt.sign(
        { _id: userDetails.email },
        process.env.TOKEN_SECRET
      );
      return res
        .header("auth-token", token)
        .status(200)
        .send({
          msg: "Successfully logged in",
          status: loggedIn,
          username: loginAttempt.username,
          code: 200,
        })
        .end();
    } else {
      return res
        .status(400)
        .send({
          msg: "Could not log in: Email or password are incorrect",
          status: loggedIn,
        })
        .end();
    }
  } catch (err) {
    res
      .status(400)
      .send({ msg: "Email or password not correct" })
      .end();
  }
});

module.exports = router;
