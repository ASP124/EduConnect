// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import multer from "multer";
// import studyMaterialsRoutes from "./routes/studyMaterials.js";
//import authRoutes from './routes/authentication.js';
// import PdfModel from "./models/StudyMaterial.js";

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connection = require("./db");
const studyMaterialsRoutes = require("./routes/studyMaterials");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const PdfModel = require("./models/StudyMaterial");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const Message = require("./models/messageModel")

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// routes
app.use("/api/users", userRoutes);
app.use('/api/studyMaterials', studyMaterialsRoutes);
app.use("/api/auth", authRoutes);


// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder for uploaded files
    cb(null, "./public/Images");
  },
  filename: (req, file, cb) => {
    // Define the filename for uploaded files
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint for file upload
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { branch, year, semester, subject } = req.body;
    const { filename } = req.file;

    // Calculate hash of the uploaded file
    const fileHash = await calculateFileHash(req.file.path);

    // Check if a study material with the same hash already exists for this subject
    const existingMaterial = await PdfModel.findOne({ hash: fileHash, subject });
    if (existingMaterial) {
      return res.status(400).json({ error: "A study material with the same PDF already exists for this subject" });
    }

    const newPdf = new PdfModel({
      fieldname: req.file.fieldname,
      originalname:req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      branch,
      year, // Added to save year in the model
      semester, // Added to save semester in the model
      subject, // Added to save subject in the model
      hash: fileHash,
    });

    const savedPdf = await newPdf.save();
    console.log("File saved successfully:", savedPdf);
    res.status(200).json(savedPdf);
  } catch (error) {
    console.error("Error uploading the PDF:", error);
    res.status(500).send("Error uploading the PDF");
  }
});
// Function to calculate the hash of a file
function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const fileStream = fs.createReadStream(filePath);
    fileStream.on("data", (data) => {
      hash.update(data);
    });
    fileStream.on("end", () => {
      resolve(hash.digest("hex"));
    });
    fileStream.on("error", (error) => {
      reject(error);
    });
  });
}

app.post('/api/messages', async (req, res) => {
  try {
    const { senderName, text } = req.body;
    const message = new Message({ senderName, text });
    await message.save();
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 'asc' });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete all messages
app.delete('/api/messages', async (req, res) => {
  try {
    await Message.deleteMany(); // This will delete all messages
    res.send('All messages cleared successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));