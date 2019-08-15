//VALIDATION
const Joi = require("@hapi/joi");

//Validate on registration

const registerValidation = data => {
  const registerSchema = {
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),

    name: Joi.string()
      .min(2)
      .max(255)
      .required(),

    username: Joi.string()
      .max(20)
      .required(),

    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  };
  return Joi.validate(data, registerSchema);
};

//Validate on login

const loginValidation = data => {
  const loginSchema = {
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),

    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  };
  return Joi.validate(data, loginSchema);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
