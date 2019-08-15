"use strict";
const crypto = require("crypto");

const hashFunctions = {};

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = function(password, salt) {
  const hash = crypto.createHmac(
    "sha512",
    salt
  ); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest("hex");
  return {
    salt,
    passwordHash: value
  };
};

hashFunctions.validateLogin = function passwordValidator(
  passwordToValidate,
  userInfo
) {
  const { salt, password } = userInfo;
  const { passwordHash } = sha512(passwordToValidate, salt);

  return password === passwordHash;
};

hashFunctions.saltandhash = function saltHashPassword(userpassword) {
  const salt = genRandomString(16); /** Gives us salt of length 16 */
  const passwordData = sha512(userpassword, salt);

  const passwordSecrets = {
    hash: passwordData.passwordHash,
    salt: passwordData.salt
  };
  return passwordSecrets;
};

module.exports.hashFunctions = hashFunctions;
