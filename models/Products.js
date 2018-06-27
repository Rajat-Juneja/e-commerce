class Products{
constructor(image,name,price,discounted_price,details){
    this.image=image;
    this.name=name;
    this.price=price;
    this.discounted_price=discounted_price;
    this.details=details;
}
constructor(image,name,price,details){
    this.image=image;
    this.name=name;
    this.price=price;
    this.discounted_price=-1;
    this.details=details;
}
};
module.exports = Products;