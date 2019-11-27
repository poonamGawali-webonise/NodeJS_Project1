var loginModel = require('../models/user.model');
var config = require('../config/database.config');

exports.findAll = () => {
    return new Promise((resolve,reject)=>{
        loginModel.find().then(data=>{
            resolve(data);
        }).catch(err=>{data
            reject(err);
        });
    });
}

exports.findOne = (userId) => {
    return new Promise((resolve,reject)=>{
        loginModel.findById(userId).then(data=>{
            resolve(data);
        }).catch(err=>{data
            reject(err);
        });
    });
}

exports.create = (data) => {
    return new Promise((resolve,reject)=>{
        //Create a User
        const User = new loginModel(data);
        //Save User in the database
        User.save().then(data=>{
            resolve(data);
        }).catch(err=>{
            reject(err);
        });
    });
}

exports.update = (userId,data) => {
    return new Promise((resolve,reject)=>{
        //Update User in the database
        loginModel.findByIdAndUpdate(userId,data,{new:true}).then(data=>{
            resolve(data);
        }).catch(err=>{
            reject(err);
        });
    });
}

exports.deleteOne = (userId) => {
    return new Promise((resolve,reject)=>{
        //Delete User in the database
        loginModel.findByIdAndRemove(userId).then(data=>{
            resolve(data);
        }).catch(err=>{
            reject(err);
        });
    });
}

exports.deleteMany = function(userIds){
    return new Promise((resolve,reject)=>{
        //Delete User in the database
        loginModel.remove({_id:userIds}).then(data=>{
            resolve(data);
        }).catch(err=>{
            reject(err);
        });
    });
}