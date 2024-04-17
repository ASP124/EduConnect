const { fileURLToPath } = require('url');
const { dirname, join } = require('path');
const express = require('express');
const PdfModel = require('../models/StudyMaterial.js');

// const __filename = fileURLToPath(import.meta.url);
// const dirname = dirname(_filename);

const router = express.Router();

// Route to get a specific study material by ID
router.get('/:id', async (req, res) => {
  try {
    console.log("Request received for study material ID:", req.params.id);
    const material = await PdfModel.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ error: 'Study material not found' });
    }

    // Construct the absolute file path
    const filePath = join(__dirname, '../public/Images', material.filename);

    // Log the base directory and constructed file path
    // console.log("Base directory:", __dirname);
    // console.log("Constructed file path:", filePath);

    // Send the PDF file as a response
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error fetching study material by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all study materials
router.get('/', async (req, res) => {
  try {
    const studyMaterials = await PdfModel.find();
    res.json(studyMaterials);
  } catch (error) {
    console.error('Error fetching study materials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;