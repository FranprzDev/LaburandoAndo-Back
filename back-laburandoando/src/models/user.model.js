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
        default: "https://media.discordapp.net/attachments/1271548261097934871/1271583466768564368/Imagen_de_WhatsApp_2024-08-09_a_las_18.37.56_612a8ac6.jpg?ex=66b7dde3&is=66b68c63&hm=56f0c7645bf3ca0e1028530d01f492ba11269c4f9b28ecf75f1a24f9e7da0f65&=&format=webp&width=676&height=676",
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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: false
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;
