const mongoose = require('./connection');
const upschema = mongoose.Schema;
var up = new upschema({mobile:Number,Object:{image:String, name:String, discounted_price:Number, available:Number, bought:Number}});
var UP = mongoose.model("userprod",up);
module.exports = UP;