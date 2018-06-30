class Products{
constructor(image,name,price,discounted_price,details,ratings,available,bought){
    this.image=image;
    this.name=name;
    this.price=price;
    this.discounted_price=discounted_price;
    this.details=details;
    this.ratings=ratings;
    this.available=available;
    this.bought=0;
}
};
module.exports = Products;