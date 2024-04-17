const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  userType: { type: String, required: true },
  extraInfo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    department: Joi.string().required().label("Department"),
    userType: Joi.string().valid("Student", "Teacher").required().label("User Type"),
    extraInfo: Joi.string().required().label("Additional Info"),
    email: Joi.string().email().required().label("Email"),
    // password: passwordComplexity().required().label("Password"),
  });

  // Use the 'when' function to conditionally require 'year' or 'jobProfile'
  const conditionalSchema = schema.when(Joi.ref("userType"), {
    is: "Student",
    then: Joi.object({ extraInfo: Joi.string().required().label("Year") }),
    otherwise: Joi.object({ extraInfo: Joi.string().required().label("Job Profile") }),
  });

  return schema.validate(data);
};

module.exports = { User, validate };
