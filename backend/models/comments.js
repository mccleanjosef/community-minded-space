const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  username: {
    type: String,
    ref: 'User'
  },

  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
  
});

module.exports = mongoose.model('Comment', commentSchema);