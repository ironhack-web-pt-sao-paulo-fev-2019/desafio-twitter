const { app } = require('./config');

app.get('/', (req,res) => {
    res.render('index')
})

app.listen(3000, '127.0.0.1');