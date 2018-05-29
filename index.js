const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const dbOperations = require('./db/usercrud');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());


app.get('/login',(req,res)=>{
    // console.log(req.query.myinput1+" username");
    // console.log(req.query.myinput2+" mobile");
    // console.log(dbOperations);
    var name = req.query.myinput1;
    var mob = req.query.myinput2;
    var user = new User(name,mob);
    // console.log(user);
    dbOperations.login(mob,user,res);
    res.sendFile(__dirname+'/public/main.html');

})

app.use((req,res,next)=>{
    res.sendFile(__dirname+'/public/error.html');
  })
  

var server = app.listen(process.env.port|1234,()=>{
    console.log(server.address().port);
})