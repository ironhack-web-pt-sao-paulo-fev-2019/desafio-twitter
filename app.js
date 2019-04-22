const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    Twitter = require('twitter'),
    session = require('express-session'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;
require('dotenv').config();

// SET UP
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'blabla', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session())
hbs.registerPartials(__dirname + '/views/partials');

// SET UP PASSPORT

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
},
    function (token, tokenSecret, profile, cb) {
        console.log(profile);
        return cb(null, profile);
    }
));

passport.serializeUser(function (user, callback) {
    callback(null, user);
})

passport.deserializeUser(function (obj, callback) {
    callback(null, obj);
})

// SET UP PASSPORT ROUTES

// auth login
app.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
app.get('/logout', (req, res) => {
    //handle with passport
    res.send('logging out');
})

// auth with twitter
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // console.log(req.user)
        var user = req.user
        res.render('login', {user});
    });

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

// ROUTES //TWITTER

var client = new Twitter({

    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET

});

app.get('/result', function (req, res, next) {

    var filter = req.query.filter;
    var query = req.query.keyword;

    if (filter == 'twit') {
        client.get('search/tweets', { q: query }, function (error, tweets, response) {
            var data = tweets.statuses;
            console.log(data);
            res.render('result', { data });
        });
    } else if (filter == 'user') {
        client.get('users/search.json', { q: query }, function (error, user, response) {
            console.log(user);
            res.render('result', { user });
        });
    } else if (filter == 'hashtag') {
        client.get('search/tweets', { q: query }, function (error, tweets, response) {
            var data = tweets.statuses;
            console.log(data);
            res.render('result', { data });
        });
    }

});

// APP LISTEN
app.listen(3000);