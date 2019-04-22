const router = require('express').Router();

// auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    res.send('logging out');
})

// auth with twitter
router.get('/twitter', (req, res) => {
    // handle with passport
    res.send('logging in with twitter')
});

module.exports = router;