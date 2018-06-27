const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Model for User
const Subs = require('./models/Subs'); // Model for subscriptions
const Products = require('./models/Products'); // Model for products
const dbOperations = require('./db/usercrud');  // Functions of users
const subOperations = require('./db/subscribecrud');  // Functions of subscriptions
const productOperations = require('./db/productcrud');  // Functions for products   
const nodemailer = require('nodemailer');  // For sending Mail



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
    // console.log(user);
    dbOperations.login(mob,user,res);
    res.sendFile(__dirname+'/public/main.html');
});

app.post('/subscribe',(req,res)=>{
    // console.log(subOperations);
    // console.log(req.body.emailid);
    var email = req.body.emailid;
    var sub = new Subs(email);
    subOperations.addUser(sub,res);
    var Subusers = subOperations.getUsers(res);
    console.log("Subusers  "+Subusers);
    // console.log(mydata);

    // res.redirect('/login');
// var inter = reInterval(function () {
// SendMailToSubs(email);
// }, 10 * 1000);
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
})

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
            from: '"Developers " <1804rajat@gmail.com>', // sender address
            to: toid, // list of receivers
            subject: "Hello, you subscribed on a Developer's post", // Subject line
            // text: '', // plain text body
            html: "<b>Welcome</b> <h2>Contact Me</h2> <a href='https://github.com/rajat-juneja'>My github</a> <br> <a href='https://www.facebook.com/rajat.juneja.1998'>My facebook</a>" // html body
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