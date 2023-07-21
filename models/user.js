const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true,
  },
  email: String,
  avatar: String,

  exercise: [{
    type: Schema.Types.ObjectId,
    ref: 'Exercise'

  }],
  
  body: {
    type: Schema.Types.ObjectId,
    ref: 'Body',
  },

});

const User = mongoose.model('User', userSchema);

module.exports = User;