const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    Twitter = require('twitter'),
    authRoutes = require('./routes/auth-routes');

require('dotenv').config();

// SET UP
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

// SET UP ROUTES
app.use('/auth', authRoutes);

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
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