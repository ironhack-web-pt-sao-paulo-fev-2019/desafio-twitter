const dbName = 'projeto-twitter';
const mongoose = require('mongoose');
const hbs = require('hbs');
const express = require('express');
const session = require('express-session');
const app = require("./routes/index")
const auth = require('./routes/auth');
const passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

const bodyParser = require("body-parser");
const routes = require('./routes');

app.use('/auth', auth);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

mongoose.connect(`mongodb://localhost/${dbName}`, (error) => {
  if (error) {
    console.log('Não consegui conectar');
  } else {
    console.log(`CONECTAMOS EM ${dbName}`);
  }
});

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

module.exports = {
  express,
  mongoose,
  app,
  passport
};