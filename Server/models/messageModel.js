const mongoose = require("mongoose");

// Define the schema for the message
const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
    // user: Object,
    timestamp: { type: Date, default: Date.now }
});

// Create and export the Message model
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
