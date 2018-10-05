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

  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret : keys.googleClientSecret,
    callbackURL : '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    console.log("tests");
    // check if user exist
    var user = await User.findOne({googleID : profile.id})
    console.log(user);
    console.log("test2");
         // if user exist exit with done
         if (user) {
            console.log("bikhir");
           console.log("1 user found");
           console.log(user);

         }
           // else create new user save credentials and exit
         else {
           console.log("creating new user");
         user = await new User({googleID : profile.id}).save();
       }

    // listing db users
    var users = await User.find({});
       if(users){
         console.log("listing db users");
         console.log(users);
       }
       else {
         console.log("no user");
       }
      console.log("done here");
     return done(null, user);
  })
  );

  app.get('/auth/google', passport.authenticate(
    'google', {
      scope: ['profile', 'email']
    }
  ), (req,res) => {
    console.log("successfully authenticated yay");
    res.send({
      message : 'successfully authenticated yay'
    })
  });

  app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  app.get('/login', (req, res) => {
    res.send({
      message : "login page bi idni llah"
    })
  })
  app.get('/', (req,res) => {

  res.send({
    message : "hello mail chimp"
  })
  });

  app.get('/API/currentUser', (req,res) => {
  if (req.user){
    res.send({
      user : req.user
    })
  }
else res.send(false);
  });

  app.get('/API/logout', (req,res) => {
  req.logout();
  res.redirect('/')
  });



}
