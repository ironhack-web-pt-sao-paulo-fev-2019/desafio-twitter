var express = require('express');
const Twitter = require('twitter');
var router = express.Router();

var client = new Twitter({

    consumer_key: 'HaNje53ElEIdzzDYCZFBFLUqW',
    consumer_secret: 'ejaSo0aNXt6r1O1p13XRWoFU2FxMVek4vjM9ga9qnWyVnAptMh',
    access_token_key: '1119382765282234368-gzZXjxlrdCaqMSasfxonv1thHC4LBj',
    access_token_secret: 'qJ0JorHyDDD7mXotXlDN10lzI5M9XpSZus03cFlU2c11i'
       
  });
  
  
/* GET users listing. */
router.post('/post-twitter', ensureAuthenticated, function(req, res, next) {

    client.post('statuses/update', {status:req.body.text})
    .then(function (tweet) {
     res.render('users',{tweet})
    })
    .catch(function (error) {
      throw error;
    })

});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login')
}

module.exports = router;
