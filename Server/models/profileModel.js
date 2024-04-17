const mongoose = require("mongoose");
const Joi = require("joi");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  department: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  extraInfo: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
  },
});

// Validation function using Joi
function validateProfile(profile) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    department: Joi.string().min(2).max(50),
    extraInfo: Joi.string().min(2).max(255),
    password: Joi.string().min(6).max(1024),
  });
  return schema.validate(profile);
}

const Profile = mongoose.model("Profile", profileSchema);

module.exports = { Profile, validateProfile };
