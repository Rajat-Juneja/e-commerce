const schema = require('./userprodschema');

const userprodOperations = {
    add(Obj,addval){
        schema.findOne({"mobile":Obj.mobile,"Object.name":Obj.Object.name},(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                if(!data){
                    console.log("NEW CREATION",Obj);
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
                    schema.update({"mobile":Obj.mobile,"Object.name":Obj.Object.name},{ "$inc": { "Object.bought": addval } },(err,dat)=>{
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
    },
    getAllProds(res){
        schema.find((err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("GET ALL PRODS",data);
                res.json({'data':data});
            }
        });
    },
    removeIt(id,res){
        schema.findByIdAndRemove(id,(err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json({'done':'done'});
            }
        })
    },
    removeAll(id,res){
        schema.findByIdAndRemove(id,(err)=>{
            console.log("IN FIND AND REMOVE");
            if(err){
                res.json({'err':err});
            }
            else{
                console.log("ISNIDE REMOVED");
                // res.json({'done':'done'});
            }
        })
    },
    UpdateIt(id,value,res){
        console.log("INSIDE UPDATE IT");
        schema.findById(id,(err,data)=>{
            if(err){
                res.json({'err':err});
            }
            else{   

                if(data.Object.bought==1 && value==-1){
                    schema.findByIdAndRemove(id,(err)=>{
                        if(err){
                            res.json({'err':err});
                        }
                        else{
                            res.json({'done':'done'});
                            
                        }
                    })
                }
                else{
                    if(data.Object.bought==data.Object.available && value==1){
                        res.json({'Over':'Max Stock'});
                    }
                    else{
                        schema.findByIdAndUpdate(id,{"$inc":{"Object.bought":value}},(err)=>{
                            if(err){
                                res.json({'err':err}); 
                            }
                            else{
                                res.json({'done':'done'});
                            }
                        })
                    }
                }
            }
        })
    },
    returnAllProds(id,callback){
        schema.findById(id,(err,data)=>{
            if(err){
                callback(err,null);
            }
            else{
                callback(null,data);
            }
        })
    },
};

module.exports = userprodOperations;