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