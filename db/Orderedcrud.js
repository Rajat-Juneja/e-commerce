const schema = require('./Orderedschema');

const orderOps = {
    addData(Obj){

        schema.create(Obj,(err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("Added");
            }
        });
    },
    getData(mob,res){
        schema.find({"mobile":mob},(err,data)=>{
            if(err){
                res.json({'err':err});
            }
            else{
                res.json({'data':data});
            }
        })
    }
};

module.exports = orderOps;