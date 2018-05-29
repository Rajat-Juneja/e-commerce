const mongoose = require('mongoose');
const configUrl = require('./config');
mongoose.connect(configUrl.url);
console.log("Connection Made");

module.exports = mongoose;