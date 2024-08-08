const mongoose = require("mongoose");

const workSchema = mongoose.Schema({
  name: {
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
    trim: true,
    unique: false,
    minLength: 3,
    maxLength: 70,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
  ],
  PricePerHour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PricePerHour",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Work = mongoose.model("Work", workSchema);

module.exports = Work;
