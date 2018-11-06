module.exports = (app) =>{

  var GoogleStrategy = require('passport-google-oauth20').Strategy;
  const keys = require('../config/key');
  const passport = require('passport');
  const User = require('../database/models/user');

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user,done)=> {
    done(null, user.id);
  })

  passport.deserializeUser(async (id,done)=> {
    var user = await User.findById(id);
    done(null,user);
  })

require('./authStrategies/googleauth')(app);
require('./authStrategies/facebookauth')(app);
require('./authStrategies/githubauth')(app);


  app.get('/login', (req, res) => {
    res.send({
      message : "login page bi idni llah"
    })
  });

  app.get('/api/currentUser', (req,res) => {
  if (req.user){
    res.send({
      user : req.user
    })
  }
else res.send(false);
  });

  app.get('/api/logout', (req,res) => {
  req.logout();
  res.redirect('/')
  });



}
