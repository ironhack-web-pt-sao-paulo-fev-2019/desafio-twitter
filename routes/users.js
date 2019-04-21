var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {

  const {id,userid} = req.session.passport.user.doc;
  
     res.render('users',{ user: req.user,photo:req.photo,userid:userid});
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login')
}

module.exports = router;
