const schema = require('./userschema');

const userOperations = {
    login(mob,userObj,res){
        schema.findOne({'mobile':mob},(err,rec)=>{
            if(err){
                res.send("Error in db");
            }
            else{
                if(rec){
                }
                else{
                    schema.create(userObj,(error,record)=>{
                        if(error){
                            res.send("Error in logging");
                        }
                    })
                }
            }
        })
    }
}
module.exports = userOperations;