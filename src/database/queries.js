"use strict";
const pool = require("../database/connection");
const queries = {};

queries.addUser = async function addUser(userInfo, cn = pool) {
  /*
--Example of parameters needed to add a new user
const passwordsecrets = saltandhash("MYPASSWORD");
const userInfo = {
  email: "rge@test2.dk",
  name: "Roar",
  username: "rge",
  hashedpassword: passwordsecrets.hash,
  salt: passwordsecrets.salt
};*/

  const { email, name, username, hashedpassword, salt } = userInfo;

  // Only run query if all inputs are present
  if (email && name && username && hashedpassword && salt) {
    try {
      const client = await cn.connect();
      console.log("connected successfully - attempting to add new user");
      // required user table values = email, name, username, hashedpassword, salt
      await client.query("INSERT INTO users VALUES ($1, $2, $3, $4, $5)", [
        email,
        name,
        username,
        hashedpassword,
        salt
      ]);
      console.log("Successfully added new user");
      await client.release();
      console.log("Ended client connection");
      return {
        code: 200,
        status: "Success",
        msg: "Added user",
        origin: "Server"
      };
    } catch (ex) {
      console.log(`Error while adding user. ${ex}`);
      return {
        code: 400,
        status: "Failure",
        msg: "Could not add user",
        origin: "Server",
        err: ex.detail
      };
    } finally {
      console.log("Ended client connection");
    }
  } else {
    console.error(
      "You are missing one or more parameters in your user insertion query"
    );
    return { msg: "You are missing some inputs. Fill them in and try again" };
  }
};

queries.readUsers = async function(cn = pool) {
  try {
    const client = await cn.connect();
    console.log("connected successfully - reading table");
    const results = await client.query("select * from users");
    await console.table(results.rows);
    await client.release();
  } catch (ex) {
    console.log(`Error while reading user table. ${ex}`);
  } finally {
    console.log("Ended client connection");
  }
};

queries.readUser = async function(email, cn = pool) {
  try {
    const client = await cn.connect();
    console.log("connected successfully - fetching row");
    const { rows } = await client.query(
      "SELECT * FROM users WHERE email = ($1)",
      [email]
    );
    await client.release();
    return rows[0];
  } catch (ex) {
    console.log(`Error while reading user table. ${ex}`);
  } finally {
    console.log("Ended client connection");
  }
};

module.exports.queries = queries;
