const express = require('express');
const app = express();
const passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
const session = require('express-session');
const mongoose = require('mongoose')
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

app.get('/login', (request, response) => {
  response.render('login');
});

app.get('/loged', (request, response) => {
  response.render('loged');
});

app.get('/login/twitter', passport.authenticate('twitter'));
app.get('/login/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = app;