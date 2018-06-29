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
    changeAvail(id,count){
        schema.findByIdAndUpdate(id,{ "$inc": { "available": -count } },(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("DONE");
            }
        });
    }
};

module.exports = prodOperations;