const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/key');
const passport = require('passport');
const bodyParser = require('body-parser');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
  maxAge : 30*24*60*60*1000,
  keys : [keys.cookieKey]
}))


require('./routes/authroutes')(app);
require('./routes/billingRoutes')(app);









app.listen('4000', ()=>{
  console.log('server listening on port 4000..');

})
