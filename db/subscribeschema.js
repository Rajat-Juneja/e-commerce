const mongoose = require('./connection');
const subSchema = mongoose.Schema;
var sub = new subSchema({email:String});
var Sub = mongoose.model("subscribers",sub);
module.exports = Sub;