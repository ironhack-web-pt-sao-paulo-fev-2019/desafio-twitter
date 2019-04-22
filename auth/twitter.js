var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/User');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({_id: id.doc._id}, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: "HaNje53ElEIdzzDYCZFBFLUqW",
    consumerSecret:"ejaSo0aNXt6r1O1p13XRWoFU2FxMVek4vjM9ga9qnWyVnAptMh",
    callbackURL: "https://iron-twitter.herokuapp.com/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    console.log(profile)
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id,photo:profile.photos[0].value}, function(err, user) {
      if (err) {
        console.log(err); 
        return done(err);
      }
      done(null, user);
    });
  }
));

module.exports = passport;
