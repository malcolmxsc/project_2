const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    exerciseNotes: {
        type: String
    },
    exerciseTime: {
        type: Number,
        required: true,
        min: 1,
        max: 1440
    },
    exerciseType: {
        type: String,
        required: true,
        enum: ["Strength", "Aerobic", "Swimming", "Yoga"]
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exercise', exerciseSchema);