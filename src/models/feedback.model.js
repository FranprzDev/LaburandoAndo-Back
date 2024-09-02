const mongoose = require("mongoose");

const feedBackSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    enum: ["Queja", "Sugerencia", "Consulta", "Felicitación", "Petición"],
  },
  message: {
    type: String,
    required: true,
    minLength: 25,
    maxLength: 300,
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false,
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

const FeedBack = mongoose.model("Feedback", feedBackSchema);

module.exports = FeedBack;
