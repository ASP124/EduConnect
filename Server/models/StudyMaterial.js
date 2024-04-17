const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const studyMaterialSchema = new mongoose.Schema({
 
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  branch: String,
  year: String, // Add 'year' field
  semester: String, // Add 'semester' field
  subject: String,
  hash: String,

});

// yeh wala yaad rakho ! Before saving a new PDF, generate and store its hash
studyMaterialSchema.pre("save", function (next) {
  if (!this.isModified("path")) {
    return next();
  }

  // Generate file hash
  const hash = crypto.createHash("sha256");
  const fileStream = fs.createReadStream(this.path);
  fileStream.on("data", (data) => {
    hash.update(data);
  });
  fileStream.on("end", () => {
    this.hash = hash.digest("hex");
    next();
  });
  fileStream.on("error", (error) => {
    next(error);
  });
});

// Create a Mongoose model based on the schema
const PdfModel = mongoose.model('Pdf', studyMaterialSchema);

module.exports = PdfModel;