const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    Twitter = require('twitter');
    
    require('dotenv').config();

// SET UP
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

// DOTENV



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

    var query = req.query.keyword;

    client.get('search/tweets', { q: query }, function (error, tweets, response) {
        const arraySearch = tweets.statuses;

        res.send(JSON.stringify(arraySearch));
    });

});

// APP LISTEN
app.listen(3000);