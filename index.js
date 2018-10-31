const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/key');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./database/models/Survey');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(cookieSession({
  maxAge : 30*24*60*60*1000,
  keys : [keys.cookieKey]
}))


require('./routes/authroutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
require('./routes/testroute')(app);


if(process.env.NODE_ENV === 'production'){
  // ensure that express serves production assets
  app.use(express.static('client/build'));

  // ensure express serves the index.html file if it doesn't recognize a route
const path = require('path');
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'client','build','index.html'));
});

}



const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
  console.log('server listening on port 4000..');

})
