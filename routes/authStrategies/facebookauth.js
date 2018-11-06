module.exports = (app) => {

  var GoogleStrategy = require('passport-google-oauth20').Strategy;
  const keys = require('../../config/key');
  const passport = require('passport');
  const User = require('../../database/models/user');
  // FACEBOOK STRATEGY

  FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    proxy : true
  },
  async (accessToken, refreshToken, profile, done) => {
    var user = await User.findOne({facebookID : profile.id});
    console.log(user);
    if(user){
      console.log("found user in db with facebookid set");
    }
    else {
      console.log("user with facebookid not found now creating one");
      user = await new User({facebookID : profile.id}).save();
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
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', 'pages_show_list'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/surveys',
                                      failureRedirect: '/login' }));

  //END FACEBOOK STRATEGY
}
