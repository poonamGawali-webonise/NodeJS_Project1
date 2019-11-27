var express = require('express');
var loginController=require('../controllers/userController');

module.exports=(function(){
    var router=express.Router();
    
    //Retrieve all Users  
    router.get('/users',loginController.findAll);//GET_All_Users

    //Retrieve a single User with userId
    router.get('/users/:userId', loginController.findOne);

    //Create a new User
    router.post("/users",loginController.create);//ADD_User

    //Update a User with userId
    router.put("/users/:userId",loginController.update);//UPDATE_User

    //Delete a User with userId
    router.delete("/users/:userId",loginController.deleteOne)//DELETE_Single_User

    //Delete multiple Users
    router.delete("/users",loginController.deleteMany);//DELETE_Users


    return router;
})();
