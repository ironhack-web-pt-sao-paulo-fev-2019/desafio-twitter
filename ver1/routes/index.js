const express = require('express');
const app = express()
const passport = require('passport'); 

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = app;