// profileRouter.js

const router = require("express").Router();
const { User, validateUpdate } = require("../models/profileModel");
const bcrypt = require("bcrypt");

router.put("/profile", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateUpdate(req.body);
    if (error) {
      return res.status(400).send({ errors: error.details });
    }

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update user data
    user.name = req.body.name;
    user.department = req.body.department;
    user.extraInfo = req.body.extraInfo;

    // If updating password, hash the new password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashPassword;
    }

    // Save the updated user
    await user.save();

    res.status(200).send({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
