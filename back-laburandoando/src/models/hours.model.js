const mongoose = require('mongoose')

const hoursSchema = mongoose.Schema({
    priceHour: {
        type: Number,
        required: true,
        trim: true,
        unique: false,
    },
    latest: {
        type: Boolean,
        required: true,
        trim: true,
        unique: false
    },
    createdAt: {
        type: Date,
        required: true,
        trim: true,
        unique: false,
        default: Date.now
    },
    /* Relaciones */
    work: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Work',
        required: true
    }
});

const PricePerHour = mongoose.model('PricePerHour', hoursSchema)

module.exports = PricePerHour