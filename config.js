const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/view');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/view/partials');

module.exports = {hbs,app}
