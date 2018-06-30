const mongoose= require('./connection');
const productsschema = mongoose.Schema;
var product = new productsschema({image:String, name:String, price:Number, discounted_price:Number, details:String, ratings:Number, available:Number, bought:Number});
var Product = mongoose.model("products",product);
module.exports = Product;
