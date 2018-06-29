const schema = require('./userprodschema');

const userprodOperations = {
    add(Obj,addval){
        schema.findOne({"mobile":Obj.mobile,"Object.name":Obj.Object.name},(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                if(!data){
                    console.log("NEW CREATION");
                    schema.create(Obj,(err,data)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("ADDED");
                        }
                    })
                }
                else{
                    console.log(addval);
                    schema.update({"mobile":Obj.mobile,"Object.name":Obj.Object.name},{ "$inc": { "Object.available": addval } },(err,dat)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("DONE",data);
                        }
                    })
                }
            }
        })



        
    }
};

module.exports = userprodOperations;