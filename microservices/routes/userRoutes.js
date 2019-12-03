var express = require('express');
var userController=require('../controllers/userController');

module.exports = (function() {
    var router=express.Router();
    
    //Retrieve all Users  
    router.get('/users',userController.findAll);//GET_All_Users

    //Retrieve a single User with userId
    router.get('/users/:userId', userController.findOne);//GET_Single_User

    //Create a new User
    router.post("/users",userController.create);//ADD_User

    //Update a User with userId
    router.put("/users/:userId",userController.update);//UPDATE_User

    //Patch a user with userId
    router.patch("/users/:userId",userController.patch);//PATCH_User

    //Delete a User with userId
    router.delete("/users/:userId",userController.deleteOne)//DELETE_Single_User

    //Delete multiple Users
    router.delete("/users",userController.deleteMany);//DELETE_Users


    return router;
})();
