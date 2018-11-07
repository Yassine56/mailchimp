module.exports = (app) => {

  var GoogleStrategy = require('passport-google-oauth20').Strategy;
  const keys = require('../../config/key');
  const passport = require('passport');
  const User = require('../../database/models/user');
  const request = require('request-promise');
  // FACEBOOK STRATEGY

  FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    proxy : true
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    var user = await User.findOne({facebookID : profile.id});
    console.log(user);
    if(user){
      console.log("found user in db with facebookid set");
    }
    else {
      console.log("user with facebookid not found now creating one");
      // req fb graph api

    // you need permission for most of these fields
    const userFieldSet = 'id, name, about, email, accounts, link, is_verified, significant_other, relationship_status, website, picture, photos, feed';
    const options = {
      method: 'GET',
      uri: 'https://graph.facebook.com/v2.8/'+ profile.id,
      qs: {
        access_token: accessToken,
        fields: userFieldSet
      }
    };
    const notparsedfbres = await request(options);
    const fbres = JSON.parse(notparsedfbres);
      console.log(fbres);
      //end req fb graph api
      user = await new User({facebookID : profile.id, picture : fbres.picture.data.url, name : fbres.name}).save();
    }

    // req fb graph api

  // you need permission for most of these fields
  // const userFieldSet = 'id, name, about, email, accounts, link, is_verified, significant_other, relationship_status, website, picture, photos, feed';
  //
  // const options = {
  //   method: 'GET',
  //   uri: 'https://graph.facebook.com/v2.8/'+ profile.id,
  //   qs: {
  //     access_token: accessToken,
  //     fields: userFieldSet
  //   }
  // };
  // request(options)
  //   .then(fbRes => {
  //     console.log(JSON.parse(fbRes).accounts);
  //   })





    //end req fb graph api

    // listing db users
    var users = await User.find({});
       if(users){
         console.log("listing db users");
         //console.log(users);
       }
       else {
         console.log("no user");
       }
      console.log("done here");
     return done(null, user);
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/surveys',
                                      failureRedirect: '/login' }));

  //END FACEBOOK STRATEGY
}
