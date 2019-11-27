var loginHelper = require('../helpers/userHelper')
var util = require('util');

const logger = require('../config/logger.config');

// Retrieve and return all users from the database.
exports.findAll = (req,res)=>{
    logger.info('Fetching all users');
    loginHelper.findAll().then(data=>{
        res.status(200).json({"status":200,"message":"Users get successfully","data":data});
    }).catch(err=>{
        res.status(500).json({"status":500,"message":err.message || "Some error occurred while getting the User"});
    });
}

// Find a single user with a userId
exports.findOne = (req,res) => {
    logger.info('Fetching single user');
    loginHelper.findOne(req.params.userId).then(data=>{
        if(!util.isNullOrUndefined(data)){
            res.status(200).json({"status":200,"message":"User get successfully","data":data});
        } else{
            res.status(404).json({"status":404,"message":"User not found with ID "+req.params.userId});
        }
    }).catch(err=>{
        if(err.kind === 'ObjectId') {
            return res.status(404).send({"status":404,
                "message": "User not found with ID " + req.params.userId
            });                
        }
        res.status(500).json({"status":500,"message":err.message || "Some error occurred while getting the User"});
    });
}

// Create and Save a new User
exports.create = (req,res) => {
    logger.info('Creating a new user');
    // Validate request
    if(Object.keys(req.body).length > 0){
        loginHelper.create(req.body).then(data=>{
            res.status(200).json({"status":200,"message":"User added successfully","data":data});
        }).catch(err=>{
            if(err.code==11000){
                res.status(409).json({"status":409,"message":"Username already exist"});
            } else{
                res.status(500).json({"status":500,"message":err.message || "Some error occurred while creating the User"});
            }
        });
    } else{
        res.status(400).json({'status':400,'message':'User content can not be empty'});
    }
}

// Update a user identified by the user Id in the request
exports.update = function(req,res){
    logger.info('Updating existing user');
    // Validate request
    if(Object.keys(req.body).length > 0){
        loginHelper.update(req.params.userId,req.body).then(data=>{
            if(!util.isNullOrUndefined(data)){
                res.status(200).json({"status":200,"message":"User updated successfully","data":data});
            } else{
                res.status(404).json({"status":404,"message":"User not found with ID "+req.params.userId});
            }
            
        }).catch(err=>{
            if(err.kind === 'ObjectId') {
                return res.status(404).send({"status":404,
                    "message": "User not found with ID " + req.params.userId
                });                
            }

            if(err.code==11000){
                res.status(409).json({"status":409,"message":"Username already exist"});
            }

            res.status(500).send({"status":500, "message" : "Error updating user with id " + req.params.userId});
        });
    } else {
        res.status(400).json({'status':400,'message':'User content can not be empty'});
    }
   
    
}

// Delete a single user with the specified user Id in the request
exports.deleteOne = function(req,res){
    logger.info('Deleting single user');
    loginHelper.deleteOne(req.params.userId).then(data=>{
        if(!util.isNullOrUndefined(data)){
            res.status(200).json({"status":200,"message":"User deleted successfully"});
        } else{
            res.status(404).json({"status":404,"message":"User not found with ID "+req.params.userId});
        }
    }).catch(err=>{
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with ID " + req.params.userId
            });                
        }
        return res.status(500).send({"status":500,"message": "Could not delete user with ID " + req.params.userId});    
    });
}

// Delete multiple user with the specified user Id in the request
exports.deleteMany = function(req,res){
    logger.info('Deleting multiple users');
    loginHelper.deleteMany(req.body).then(data=>{
        if(data.deletedCount!=0){
            res.status(200).json({"status":200,"message":"Users deleted successfully"});
        } else{
            res.status(404).json({"status":404,"message":"User not found with ID "+req.body});
        }
    }).catch(err=>{
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with ID " + req.body
            });                
        }
        return res.status(500).send({"status":500,"message": "Could not delete user with ID " + req.body});    
    });
}
