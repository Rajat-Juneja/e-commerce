const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Model for User
const Subs = require('./models/Subs'); // Model for subscriptions
const Products = require('./models/Products'); // Model for products
const dbOperations = require('./db/usercrud');  // Functions of users
const subOperations = require('./db/subscribecrud');  // Functions of subscriptions
const productOperations = require('./db/productcrud');  // Functions for products   
const nodemailer = require('nodemailer');  // For sending Mail
var schedule = require('node-schedule');  // For Scheduling Tasks, i.e. , Subscribers mails



var Subusers;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view-engine','ejs');
app.use(bodyParser.json());


app.get('/login',(req,res)=>{
    // console.log(req.query.myinput1+" username");
    // console.log(req.query.myinput2+" mobile");
    // console.log(dbOperations);
    var name = req.query.myinput1;
    var mob = req.query.myinput2;
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
});

app.get('/product/:id',(req,res)=>{
//     // res.send("HEllo");

    productOperations.getProd(req.params.id,res);
    console.log(req.params.id+"Inside");
// console.log("Inside");
    // res.sendFile(__dirname+'/public/product.html',(err)=>{
        // if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Done");
    //     }
    // });
    // res.redirect('/product.html');
    // res.sendFile(__dirname+'/public/product.html');
});

app.use((req,res,next)=>{
    res.sendFile(__dirname+'/public/error.html');
  })
  

var server = app.listen(process.env.port|1234,()=>{
    console.log(server.address().port);
})


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