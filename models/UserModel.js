const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    twitterId: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;