const mongoose = require('./connection');
const OrderSchema = mongoose.Schema;
var ordered = new OrderSchema({mobile:Number,Object:{image:String, name:String, discounted_price:Number, available:Number, bought:Number},date:Date});
var Ordered = mongoose.model("Ordered",ordered);
module.exports = Ordered;