const { Schema } = require("mongoose");
const User = require("./user.model");

const workerSchema = new Schema({
  phone: {
    type: String,
    required: false,
    trim: true,
    unique: false,
  },
  address: {
    type: String,
    required: false,
    trim: true,
    unique: false,
    minLength: 3,
    maxLength: 70,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    default: "worker",
    enum: ["worker"],
  },
  outstanding: {
    type: Boolean,
    required: true,
    default: false,
  },
  works: [
    {
      type: Schema.Types.ObjectId,
      ref: "Work",
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Worker = User.discriminator("Worker", workerSchema);

module.exports = Worker;
