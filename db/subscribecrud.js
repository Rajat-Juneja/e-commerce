const schema = require('./subscribeschema');

const subOperations = {
    addUser(subObj,res){
        schema.findOne(subObj,(err,dat)=>{
            if(err){
                // res.send("Already ")
            }
            else{
                if(dat){
                    res.send("Already Exists");
                }
                else{
                    schema.create(subObj,(error)=>{
                        if(error){
                            res.send("Couldn't Subscribe, Please try again later.");
                        }
                        else{
                            
                        }
                    })
                }
            }
        });
        
    },
    getUsers(callback){
        schema.find((err,users)=>{
            if(err){
                
                callback(err,null);
            }
            else{
                callback(null,users);
               
                // (error,users)=>{
                    
                // }
                // res(users);
                // res.send()
                // console.log(users);
                // res.json({'mydata':users});
                // return users;
                // res.sendFile(__dirname+'../public/main.html',{'mydata':users});
                // res.redirect('/login',{subUse:data});
                // res.render('/login',{})
            }
        });
    }
}

module.exports = subOperations;