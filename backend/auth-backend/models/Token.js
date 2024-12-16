const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Token', tokenSchema);