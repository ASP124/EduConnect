const router = require("express").Router();
const { User, validate} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { fileURLToPath } = require('url');
// const { dirname, join } = require('path');
// const PdfModel = require('../models/StudyMaterial.js');

router.post("/signup", async (req, res) => {
  console.log(req)
  try {
    // const { error } = validate(req.body);

    // if (error) {
    //   return res.status(400).send({ errors: error.details });
    // }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send({ message: "User with the given email already exists!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    if (req.body.userType === "Student" && !req.body.extraInfo) {
      return res.status(400).send({ message: "Year is required for students." });
    } else if (req.body.userType === "Teacher" && !req.body.extraInfo) {
      return res.status(400).send({ message: "Job Profile is required for teachers." });
    }
    console.log(req.body)
    const newUser = new User({
      name: req.body.name,
      department: req.body.department,
      userType: req.body.userType,
      extraInfo: req.body.extraInfo,
      email: req.body.email,
      password: hashPassword,
    }); 
    console.log(newUser)

    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.put("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
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

router.post("/",async (req,res) => {
  try {
    const {token} = req.body;
    const {_id} = jwt.verify(token,process.env.JWTPRIVATEKEY);
    const user = await User.findById(_id).select("-password");
    if(!user){
      throw Error("Inavlid Token")
    }
    return res.json(user);
  } catch (error) {
    return res.status(401).json({error:error.message,message:"Inavlid Token",status:401})
  }

})


module.exports = router;
