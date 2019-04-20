var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var tweets = require('./routes/searchTweets');
var Twitter = require('twitter');
var app = express();


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/node-passport-social', { useMongoClient: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
  
  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'blah', name: 'id' }))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

var client = new Twitter({

  consumer_key: 'HaNje53ElEIdzzDYCZFBFLUqW',
  consumer_secret: 'ejaSo0aNXt6r1O1p13XRWoFU2FxMVek4vjM9ga9qnWyVnAptMh',
  access_token_key: '1119382765282234368-gzZXjxlrdCaqMSasfxonv1thHC4LBj',
  access_token_secret: 'qJ0JorHyDDD7mXotXlDN10lzI5M9XpSZus03cFlU2c11i'
     
});


app.get('/tweets', function(req, res, next) {

    client.get('search/tweets', {q: '#bolsonaro'}, function(error, tweets, response) {
       
       res.send(tweets)
     });
     
  });

  app.get('/search-user', function(req, res, next) {

    client.get('users/search.json', {q: 'Wilkor'}, function(error, tweets, response) {
       
       res.send(tweets)
     });
     
  });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
