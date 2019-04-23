const express = require('express');
const app = express();
const passport = require('passport'),
  TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const UserModel = require('../models/userModel');
const cookieParser = require('cookie-parser');
const api = 'https://api.twitter.com/1.1/search/tweets.json';
const twitter = require('twitter');
const dotEnv = require('dotenv').config();

const twit = new twitter({
  consumer_key: dotEnv.parsed.consumerKey,
  consumer_secret: dotEnv.parsed.consumerSecret,
  access_token_key: dotEnv.parsed.accessToken,
  access_token_secret: dotEnv.parsed.acessSecret,
});

app.use(cookieParser());
app.use(passport.initialize());
app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));


app.use(passport.session());

app.get('/logoff',
  function (request, response) {
    request.logout();
    response.render('login');
  });

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/loged', (request, response) => {
  if (verifyLoged(request) === true) {
    response.render('loged');
  } else {
    response.redirect('/login');
  }
});

app.get('/login', (request, response) => {
  response.render('login');
});

app.get('/search-results', (request, response) => {
  twit.get('search/tweets', {
    q: 'nodejs'
  }, function (error, tweets, res) {
    response.render('search-results', tweets.statuses);
  });
});

app.get('/login/callback',
  passport.authenticate('twitter', {
    successRedirect: '/loged',
    failureRedirect: '/login',
  }));

app.get('/login/twitter', passport.authenticate('twitter'));

function verifyLoged(request) {
  let a = JSON.stringify(request.session);
  a = a.split(',')[5];
  if (a === undefined) {
    return false;
  }
  return true;
}

module.exports = app;