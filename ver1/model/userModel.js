const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = mongoose.model(
  "User",
  new Schema({
    name: String,
    userid: String,
    password: String,
  })
);

// UserModel.statics.findOrCreate = require("mongoose-findorcreate");

module.exports = UserModel;