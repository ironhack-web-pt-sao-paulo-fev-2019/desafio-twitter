const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    Twitter = require('twitter'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    mongoose = require('mongoose'),
    User = require('./models/UserModel'),
    cookieSession = require('cookie-session');
require('dotenv').config();

// SET UP
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [process.env.COOKIE_KEY]
}))
hbs.registerPartials(__dirname + '/views/partials');

// CONNECT MONGODB
const dbName = 'users';
mongoose.connect(`mongodb://localhost/${dbName}`, (err) => {
    err ? console.log(err) : console.log(`Conectado ao Data Base: ${dbName}!`)
})

// SET UP PASSPORT
app.use(passport.initialize());
app.use(passport.session())

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
},
    function (token, tokenSecret, profile, done) {
        User.findOne({twitterId: profile.id}).then((currentUser) => {
            if(currentUser){
                console.log(`User is: ${currentUser}`);
                done(null, currentUser);
            } else {
                new User({
                    username: profile.displayName,
                    twitterId: profile.id
                }).save().then((newUser) => {
                    console.log('new user created:' + newUser);
                    done(null, newUser);
                })
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        done(null, user);
    }) 
})

// SET UP PASSPORT ROUTES

// auth login
app.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
app.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    res.redirect('/')
})

// auth with twitter
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
passport.authenticate('twitter', { failureRedirect: '/' }),
function (req, res) {
    // Successful authentication, redirect home.
    // var user = req.user;
    // res.send(user);
    res.redirect('/profile');
});

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
})

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/');
    } else {
        next();
    }
}

app.get('/profile', authCheck, (req, res) => {
    console.log(req.user.username)
    res.render('profile', {user:req.user});
})

// ROUTES TWITTER-SEARCH

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