const express = require('express');
const app = express();
const passport = require('passport'),
  TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const UserModel = require('../models/userModel');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));


app.use(passport.session());

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/loged', (request, response) => {
  response.cookie('twitter-session-cookie', new Date());
  if (request.cookies['twitter-session-cookie']) {
    response.render('loged');
  } else {
    response.redirect('/');
  }
});

app.get('/login', (request, response) => {
  response.render('login');
});

app.get('/login/twitter', passport.authenticate('twitter'));

app.get('/login/callback',
  passport.authenticate('twitter', {
    successRedirect: '/loged',
    failureRedirect: '/login'
  }));

app.get('/logoff',
  function (req, res) {
    res.clearCookie('twitter-session-cookie');
    res.redirect('/');
  }
);
module.exports = app;