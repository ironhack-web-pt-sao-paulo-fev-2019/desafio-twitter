var express = require('express'),
    app = express(),
    hbs = require('hbs');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req,res) => {
    res.render('index')
})

app.listen(3000, '127.0.0.1');