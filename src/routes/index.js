const { app } = require('../config');

const {
  home,
  searchResults

} = require('../actions');

app.get('/',home);
app.get('/search-results',searchResults);

module.exports = app;