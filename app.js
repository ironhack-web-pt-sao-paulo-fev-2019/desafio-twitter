const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    Twitter = require('twitter');

// SET UP
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
})

// ROUTES //TWITTER

var client = new Twitter({

    consumer_key: 'bwcKhoXjKc8jOmTLCR97Gc11J',
    consumer_secret: 'u9jK0WqbuHR5McKvEgEfnfo9WQOXrlJUixMCgyLvQXaxu2qWJP',
    access_token_key: '1088533182679519232-H5EoI9emQqiUcemRJKge6CKWulgWo6',
    access_token_secret: 'hT3oBrQIn58A7zC3d5v5O1fBuAebaFKDqPmG1pIBzCK3n'

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