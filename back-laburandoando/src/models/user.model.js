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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fdefault-avatar&psig=AOvVaw3vfpKCE4HWFPsEOz5IPJLB&ust=1723184244314000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKj9ztff5IcDFQAAAAAdAAAAABAE",
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
