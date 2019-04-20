const passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../model/userModel');
const findOrCreate = require("mongoose-findorcreate");
const bodyParser = require('body-parser');
require('dotenv').config();
const { app } = require('../config');


passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({_id: id.doc._id}, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
  // const consumerKey = process.env.consumerKey;
      consumerKey: "uw1o5g9S3dai7gNKiryT0ze4i",
    consumerSecret: "Hxt9TM6ddCBfiGmjFpnbeGr1e2Xfthi5sZbAIrV4zWxlP45dBp",
    callbackURL: "http://127.0.0.1:3000/auth/twitter"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) {
        consxole.log(err);
        return done(err);
      }
      done(null, user);
    });
  }
));

module.exports = passport;
