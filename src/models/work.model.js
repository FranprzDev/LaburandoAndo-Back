const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const workSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    minLength: 15,
    maxLength: 90,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    minLength: 300,
    maxLength: 900,
  },
  location: {
    type: String,
    required: false,
    trim: true,
    unique: false,
    minLength: 3,
    maxLength: 50,
    default: "Remoto",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  pricePerHour: {
    type: Number,
    min: 500,
    max: 50000,
    required: true,
  },
  currency: {
    type: String,
    required: false,
    default: "ARS",
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }],
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    required: true,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review",
    required: false,
  }
],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Work = mongoose.model("Work", workSchema);

module.exports = Work;
