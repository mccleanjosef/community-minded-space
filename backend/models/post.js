const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image_url: String,
  location: String,
  name: String,
  description: String,
  comment:[],

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  profile_img:{
    type: String,
    ref: 'User'
  },
  username:{
    type: String,
    ref: 'User'
  }
})

module.exports = mongoose.model('Post', postSchema);