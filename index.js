const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/key');
const passport = require('passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(cookieSession({
  maxAge : 30*24*60*60*1000,
  keys : [keys.cookieKey]
}))


require('./routes/authroutes')(app);









app.listen('4000', ()=>{
  console.log('server listening on port 4000..');
})
