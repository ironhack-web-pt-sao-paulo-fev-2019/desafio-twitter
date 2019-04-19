const {hbs} = require('../config')
const fetch = require('node-fetch');
require('dotenv').config();

const searchResults = (request,response) => {
  const {q} = request.query;
    fetch(process.env.END_POINT+"q="+q+"&api-key="+process.env.API_KEY_SEARCH_NYT)
      .then(res => res.json())
      .then(json => {
       const objNotice = json.response.docs;
       response.render('seach-result',{objNotice})
      })
      .catch(error => console.log(error) )
  
}
  module.exports = searchResults;
