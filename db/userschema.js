const mongoose = require('./connection');
const userSchema = mongoose.Schema;
var user = new userSchema({username:String, mobile:Number});
var User = mongoose.model("users",user);
module.exports = User;
