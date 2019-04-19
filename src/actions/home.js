const hbs = require('../config');
const home = (request,response) => {
  response.render('index');
}

module.exports = home;
