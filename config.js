const dbName = 'projeto-twitter';
const mongoose = require('mongoose');
const hbs = require('hbs');
const express = require('express');
const session = require('express-session');
const passport = require('passport'),
  TwitterStrategy = require('passport-twitter').Strategy;
const bodyParser = require("body-parser");
const routes = require('./routes');
const UserModel = require('./models/userModel');
const findOrCreate = require('mongoose-findorcreate');
const app = require('./routes/index');
require('dotenv').config()
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

passport.use(new TwitterStrategy({
    consumerKey: "uw1o5g9S3dai7gNKiryT0ze4i",
    consumerSecret: "Hxt9TM6ddCBfiGmjFpnbeGr1e2Xfthi5sZbAIrV4zWxlP45dBp",
    callbackURL: "http://127.0.0.1:3000/loged"
  },
  function (token, tokenSecret, profile, done) {
    userData = {
      userid: profile.id,
      name: profile.username, 
      displayName: profile.displayName,
    }
    UserModel.findOne({
      username: profile.username
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      done(createOrReturn(user, userData), user);
    });
  }
));

function createOrReturn(user, username) {
  if (user == null) {
    UserModel.create(username, (error) => {
      if (error) {
        console.log(`Erro ao criar documento ${error}`);
      } else {
        console.log(`Salvamos o documento: ${username}`);
        return username;
      }
    })
  }
    else {
      return user;
}
}

module.exports = {
  express,
  mongoose,
  app,
  passport
};