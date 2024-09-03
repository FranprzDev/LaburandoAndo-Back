const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        minLength: 3,
        maxLength: 50
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function(value) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value);
            },
            message: props => `${props.value} no es un correo electrónico válido.`,
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        minLength: 8,
        maxLength: 70,
        validate: {
            validator: function(value) {
              const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
              return passwordRegex.test(value);
            },
            message: props => `${props.value} no es una contraseña válida. Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.`,
        },
    },
    img: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dh4b6g2ld/image/upload/fl_preserve_transparency/v1725326098/Logo_ghomu4.jpg?_s=public-apps",
        trim: true,
        unique: false,
    },
    local: {
        type: Boolean,
        required: false,
        default: true,
    },
    googleId: {
        type: String,
        required: false,
        trim: true,
        unique: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;
