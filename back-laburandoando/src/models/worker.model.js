const { Schema } = require("mongoose");
const User = require("./user.model");

const workerSchema = new Schema({
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (value) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value);
      },
      message: (props) =>
        `${props.value} no es un número de teléfono válido. Debe tener 10 dígitos.`,
    },
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
  stars: {
    type: Schema.Types.ObjectId,
    ref: "Star",
    required: false,
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
