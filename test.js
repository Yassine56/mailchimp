const keys = require('./config/key')
const mongoose = require('mongoose');
const User = require('./database/models/user');

mongoose.connect(keys.mongoURI);
(async function () {

   var users = await User.find({});
   console.log(users);
} )()
