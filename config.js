const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

hbs.registerPartials(__dirname + '/views/partials');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = {hbs,app}