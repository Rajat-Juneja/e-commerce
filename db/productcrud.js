const schema = require('./productshema');

const prodOperations={
    getProds(res){
        schema.find((err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json({'data':data});
            }
        })
    },
    getProd(id,res){
        schema.findById(id,(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json({'data':data});
            }
        })
    },
    getAProd(id,callback){
        schema.findById(id,(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })

    },
    changeAvail(name,count,res){
        schema.findOneAndUpdate({"name":name},{"$inc":{"available":-count}},(err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json({'done':'done'});
            }
        });
    },
    getSearched(value,res){
        schema.find({"name": {'$regex' : '.*' + value + '.*'}},(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
                res.json({'data':data});
            }
        });
    }
};

module.exports = prodOperations;