const mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  googleID : String
})

module.exports = mongoose.model("User",UserSchema);
