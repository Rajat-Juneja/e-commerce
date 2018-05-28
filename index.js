const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());


var server = app.listen(process.env.port|1234,()=>{
    console.log(server.address().port);
})