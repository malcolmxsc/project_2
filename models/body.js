const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bodySchema = new Schema({
  BMI: {
    type: Number,
    required: true,
  },
  heightCM: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Body', bodySchema);