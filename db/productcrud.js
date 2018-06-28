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
    }
};

module.exports = prodOperations;