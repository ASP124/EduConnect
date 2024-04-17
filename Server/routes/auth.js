const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const jwt = require("jsonwebtoken");

// Middleware to handle request validation
function validateRequest(req, res, next) {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
}

// User registration (Sign-up)
router.post("/signup", validateRequest, async (req, res) => {
  try {
    const { name, department, userType, extraInfo, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "A user with this email address already exists." });
    }

    // Create a new user
    user = new User({
      name,
      department,
      userType,
      extraInfo,
      email,
      password,
    });


    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid email or password." });
    }

    const token = user.generateAuthToken();

    // Send user name and token as part of the response
    res.send({ token, userName: user.name, userType: user.userType });

  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
});


module.exports = router;
