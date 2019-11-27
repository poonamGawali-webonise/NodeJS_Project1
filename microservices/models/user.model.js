const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username : {type:String,unique:true},
    password : {type:String},
    firstname : {type:String},
    lastname : {type:String},
    email : {type:String}
});

var Login = mongoose.model('userDetails',userSchema);
module.exports = Login;