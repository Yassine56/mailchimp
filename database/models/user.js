const mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  googleID : String,
  facebookID:String,
  githubID : String,
  name : String,
  picture : String,
  url : String,
  credits : {
      type: Number,
      default: 0
  }
})

module.exports = mongoose.model("User",UserSchema);
