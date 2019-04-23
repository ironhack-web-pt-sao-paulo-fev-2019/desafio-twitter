const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const hbs = require('hbs');

const index = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const post = require('./routes/post-twitte');
const Twitter = require('twitter');
const app = express();
require('dotenv')
.config({
    path: path.resolve(process.cwd(),'./environment/.env')
});


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/node-passport-social', { useMongoClient: true })
.then(() =>  console.log('connection successful'))
 .catch((err) => console.error(err)); 


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');


app.use(session({ secret: 'blah', name: 'id' }))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/post-twitter',post);


var client = new Twitter({

  consumer_key: process.env.consumer_key,
  consumer_secret:process.env.consumer_secret ,
  access_token_key:process.env.access_token_key ,
  access_token_secret: process.env.access_token_secret
     
});


app.post('/post-destroy',(req,res,next) => {

   const idPost = req.body.idPost;
   
  client.post(`statuses/destroy/${idPost}.json`,function(error, tweets, response){
  
  client.get('statuses/user_timeline.json', {screen_name: req.username}, function(error, tweets, response) {
  const {id,userid,photo} = req.session.passport.user.doc;
    const arrayTweets= tweets
   res.render('twitte',{arrayTweets:arrayTweets,user: req.user,photo:photo,userid:userid})

   
   });

  })

})

app.post('/post-twitter',(req,res,next) =>{

  client.post('statuses/update', {status:req.body.text})
    .then(function (tweet) {
      client.get('statuses/user_timeline.json', {screen_name: req.username}, function(error, tweets, response) {
        const {id,userid,photo} = req.session.passport.user.doc;
          const arrayTweets= tweets
         res.render('twitte',{arrayTweets:arrayTweets,user: req.user,photo:photo,userid:userid})
        });
    })
    .catch(function (error) {
      throw error;
    })

    
})  


app.get('/list-all', (req,res,next) => {
 

  const query = req.username


 client.get('statuses/user_timeline.json', {screen_name: query}, function(error, tweets, response) {
  const {id,userid,photo} = req.session.passport.user.doc;
    const arrayTweets= tweets

    //res.send(arrayTweets)
    res.render('twitte',{arrayTweets:arrayTweets,user: req.user,photo:photo,userid:userid})

   
   });
   

});

app.get('/post', function(req, res, next) {
   res.redirect('/list-all')

});


app.get('/home',(req,res,next)=>{
  const {id,userid} = req.session.passport.user.doc;

  res.render('searchTwitter',{ user: req.user,photo:req.photo,userid:userid});

})


app.get('/tweets', function(req, res, next) {

     const query = req.query.hash

    client.get('search/tweets', {q:query}, function(error, tweets, response) {
      const {id,userid} = req.session.passport.user.doc;
        const arraySearch = tweets.statuses

        //res.send(arraySearch);
        res.render('search',{arraySearch,user: req.user,photo:req.photo,userid:userid})
     });
     
  });

  app.get('/search-user', function(req, res, next) {

    const query = req.query.hash
    client.get('users/search.json', {q: query}, function(error, tweets, response) {
      const {id,userid} = req.session.passport.user.doc;
      const arraySearch = tweets
     res.render('userSearch',{arraySearch,user: req.user,photo:req.photo,userid:userid})
     // res.send(arraySearch)
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
