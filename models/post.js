const mongoose = require('mongoose');

// A post has many likes, a like belongs to a POST
// Change the photo URL into more text, get rid of like
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
    photoUrl: String,
    caption: String,
    date: String,
    sleepTime: String,
    sleepLength: String,
    //likes: [likesSchema] // embedded schema// One Post has many Likes!
  })
 

module.exports = mongoose.model('Post', postSchema);