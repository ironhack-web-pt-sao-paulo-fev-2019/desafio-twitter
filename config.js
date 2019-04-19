var express = require('express'),
    app = express(),
    hbs = require('hbs');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

module.exports = {
    app
}