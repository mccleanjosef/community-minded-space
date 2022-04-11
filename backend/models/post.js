const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image_url: String,
  location: String,
  name: String,
  description: String,
  comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  // comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

module.exports = mongoose.model('Post', postSchema);