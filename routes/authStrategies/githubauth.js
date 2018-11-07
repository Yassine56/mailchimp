module.exports = (app) => {

  var GoogleStrategy = require('passport-google-oauth20').Strategy;
  const keys = require('../../config/key');
  const passport = require('passport');
  const User = require('../../database/models/user');

  // GITHUB Strategy begin

  var GitHubStrategy = require('passport-github').Strategy;

  passport.use(new GitHubStrategy({
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: "/auth/github/callback",
      proxy : true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      var user = await User.findOne({githubID : profile.id});
      console.log(user);
      if(user){
        console.log("found user in db with facebookid set");
      }
      else {
        console.log("user with facebookid not found now creating one");
        user = await new User({githubID : profile.id, url : profile.profileUrl, name : profile.username, picture : profile.photos[0].value }).save();
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

  app.get('/auth/github',
    passport.authenticate('github', { scope: ['email', 'profile'] })
  );

  app.get('/auth/github/callback',
    passport.authenticate('github', { successRedirect: '/surveys',
                                        failureRedirect: '/login' }));





  //http://localhost:4000/auth/github/callback

  //github strategy end
}
