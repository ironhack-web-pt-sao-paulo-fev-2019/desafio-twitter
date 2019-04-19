const express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;


const router  = express.Router();

passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function(token, tokenSecret, profile, callback) {
    return callback(null, profile);
}));

passport.serializeUser(function(user, callback) {
    callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
})

