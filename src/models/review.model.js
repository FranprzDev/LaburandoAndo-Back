const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 150,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    work: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Work",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;