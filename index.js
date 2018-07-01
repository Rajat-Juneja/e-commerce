const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Model for User
const Subs = require('./models/Subs'); // Model for subscriptions
const Products = require('./models/Products'); // Model for products
const userProd = require('./models/UserProd'); // Model for Products of User
const Ordered = require('./models/Ordered'); // Model for Ordered products of a User with date
const dbOperations = require('./db/usercrud');  // Functions of users
const subOperations = require('./db/subscribecrud');  // Functions of subscriptions
const productOperations = require('./db/productcrud');  // Functions for products 
const userprodOperations = require('./db/userprodcrud'); // Function for Products of individual user  
const orderedOperations = require('./db/Orderedcrud'); // Function for Ordered products maintainence
const nodemailer = require('nodemailer');  // For sending Mail
var schedule = require('node-schedule');  // For Scheduling Tasks, i.e. , Subscribers mails
const session = require("express-session");
var cookieParser = require('cookie-parser');
var path = require('path');


var Subusers;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public'), {index: 'nonon.html'}));

app.set('view-engine','ejs');

app.use(session({
    secret: 'thisisthesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,maxAge: 7200000 }
  }));

app.use(bodyParser.json());

var mob;
app.get('/',(req,res)=>{
    console.log("Started",req.session.mob);
    if(req.session.mob){    
        res.sendFile(__dirname+'/public/main.html');
    }
    else{
        res.sendFile(__dirname+'/public/index.html');
    }
})
app.get('/login',(req,res)=>{
    var name = req.query.myinput1;
    mob = req.query.myinput2;
    // console.log(mob);
    req.session.mob=mob;
    var user = new User(name,mob);
    dbOperations.login(mob,user,res);
    res.sendFile(__dirname+'/public/main.html');
});

app.post('/subscribe',(req,res)=>{
    // console.log(subOperations);
    // console.log(req.body.emailid);
    res.redirect('back');
    var email = req.body.emailid;
    var sub = new Subs(email);
    subOperations.addUser(sub,res);
    // console.log(req.originalUrl);
});


var j = schedule.scheduleJob('0 10 * * *', function(){
    subOperations.getUsers((error,data)=>{
        if(error){
            console.log(error);
            // res.send("cant find user");
        }
        else{
            Subusers = data;
            for(let i=0;i<Subusers.length;i++){
                SendMailToSubs(Subusers[i].email);
            }
        }
    });
  });

app.post('/contactus',(req,res)=>{
    res.sendFile(__dirname+'/public/contact.html');
    var fname = req.body.fnamec;
    var lname = req.body.lnamec;
    var email = req.body.emailc;
    var senderInfo = "First Name : "+fname+" , Last Name : "+lname+" , Email id : "+email;
    var subject = req.body.subc;
    var message = senderInfo+"\n\n "+req.body.textc;
    // console.log(fname,lname,email,subject,message);
    SendMail(subject,message);
});

app.get('/products',(req,res)=>{
    productOperations.getProds(res);
    // console.log(req.session.mob);
});

app.get('/product/:id',(req,res)=>{
    productOperations.getProd(req.params.id,res);
    // console.log("Mobile ",mob); 
    // console.log(req.session.mob);
});

app.get('/product/:id/avail',(req,res)=>{
    var id = req.params.id;
    var bought = req.query.count;
    var Obj;
    // productOperations.changeAvail(id,bought); //For changing product availability;
    productOperations.getAProd(id,(err,data)=>{
        if(err){
            console.log(err);
            res.redirect('back');
        }
        else{
            Obj=data;
            Obj.bought = bought;
            var UserProd = new userProd(req.session.mob,Obj);
            userprodOperations.add(UserProd,bought);
            res.redirect('back');
        }
    });
});

app.get('/newlogin',(req,res)=>{
    // mob="";
    req.session="";
    res.sendFile(__dirname+'/public/index.html');

});

app.get('/buy',(req,res)=>{
    userprodOperations.getAllProds(res);
});

app.get('/removed/:id',(req,res)=>{
    var id = req.params.id;
    userprodOperations.removeIt(id,res);
});

app.get('/subtract/:id',(req,res)=>{
    var id = req.params.id;
    var value=-1;
    userprodOperations.UpdateIt(id,value,res);
});

app.get('/add/:id',(req,res)=>{
    var id = req.params.id;
    var value=1;
    userprodOperations.UpdateIt(id,value,res);
});

app.get('/subavail/:name/:bought/:id',(req,res)=>{
    var name = req.params.name;
    var boughtamt = req.params.bought;
    var id = req.params.id;
    // var Obj;
    // productOperations.changeAvail(name,boughtamt,res);
    userprodOperations.returnAllProds(id,(err,data)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }
            else{
                console.log("Got all prods",data);
                var Obj= new Ordered(data.mobile,data.Object);
                var dates = new Date();
                // date = dates.toDateString();
                Obj.date=dates;
                console.log(Obj);
                orderedOperations.addData(Obj);
                userprodOperations.removeAll(id,res);
                // res.sendFile(__dirname+'/public/products.html');
            }
    });
    // orderedOperations
    console.log("NAME",name);
    console.log("Bought",boughtamt);
});

app.get('/Orders',(req,res)=>{
    orderedOperations.getData(req.session.mob,res);
});

app.get('/search/:val',(req,res)=>{
    console.log("SEARCH CALLED");
    // res.redirect('back');
    console.log(req.params);
    var value = req.params.val;
    productOperations.getSearched(value,res);
});

app.use((req,res,next)=>{
    res.sendFile(__dirname+'/public/error.html');
  })
  

var server = app.listen(process.env.port|1234,()=>{
    console.log(server.address().port);
});


// req.params  :  The info of url can be accessed


function SendMail(subject,message){

nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: '1804rajat@gmail.com',
               pass: 'tataphoton'
           }
       });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Developers " <1804rajat@gmail.com>', // sender address
        to: 'junejarajat98@gmail.com', // list of receivers
        subject: subject, // Subject line
        text: message // plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else{
            console.log(info);
        }
    });
});

}


function SendMailToSubs(toid){

    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: '1804rajat@gmail.com',
                   pass: 'tataphoton'
               }
           });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Developer " <1804rajat@gmail.com>', // sender address
            to: toid, // list of receivers
            subject: "Hello, you subscribed on a Developer's post", // Subject line
            // text: '', // plain text body
            html: "<h1>Welcome</h1> <h2>Contact Me</h2> <a href='https://github.com/rajat-juneja'>My github</a> <br> <a href='https://www.facebook.com/rajat.juneja.1998'>My facebook</a>" // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else{
                console.log(info);
            }
        });
    });
    
    }