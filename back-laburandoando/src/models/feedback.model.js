const mongoose = require("mongoose");

const feedBackSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    minLength: 3,
    maxLength: 25,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Feedback = mongoose.model("Feedback", feedBackSchema);

module.exports = Feedback;
